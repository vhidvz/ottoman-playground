import { Command, CommandRunner, Option } from 'nest-commander';
import { Inject, Injectable } from '@nestjs/common';
import { COUCH_CONFIG } from '@app/common/envs';
import { HttpService } from '@nestjs/axios';

import { COUCH_OPTIONS } from './couch.const';
import { stringify } from 'querystring';

interface CouchCommandOptions {
  bucket?: string[] | true;
}

@Injectable()
@Command({
  name: 'couch',
  arguments: '<task>',
  options: { isDefault: true },
  description: 'Couch commands',
})
export class CouchService extends CommandRunner {
  constructor(
    private readonly httpService: HttpService,
    @Inject(COUCH_OPTIONS) readonly config: ReturnType<typeof COUCH_CONFIG>,
  ) {
    super();
  }

  async run(passedParams: string[], options?: CouchCommandOptions): Promise<void> {
    if (passedParams.includes('init')) await this.init(options);
  }

  async init(options?: CouchCommandOptions): Promise<void> {
    console.log('Initializing couchbase...');

    const port = +process.env.COUCH_PORT || 8091;
    const { bucketName, username, password } = this.config;
    const ramQuotaMB = +process.env.COUCH_RAM_QUOTA_MB || 256;

    // Set Admin Credentials
    try {
      await this.httpService.axiosRef.post('/settings/web', stringify({ username, password, port }));
      console.log('\x1b[32m%s\x1b[0m', `Admin credential settled.`);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch {
      console.log('\x1b[33m%s\x1b[0m', `Admin credential already settled.`);
    }

    // Create a Bucket
    if (this.cond(bucketName, options)) {
      const { data: buckets } = await this.httpService.axiosRef.get('/pools/default/buckets', {
        auth: { username, password },
      });

      if (!buckets?.some((b: { name: string }) => b.name === bucketName)) {
        await this.httpService.axiosRef.post('/pools/default/buckets', stringify({ name: bucketName, ramQuotaMB }), {
          auth: { username, password },
        });

        console.log('\x1b[32m%s\x1b[0m', `Couchbase bucket ${bucketName} created.`);
        console.log('\x1b[33m%s\x1b[0m', `Please make sure the bucket configured correctly.`);
      } else console.log('\x1b[33m%s\x1b[0m', `Couchbase bucket ${bucketName} already exists.`);
    }

    console.log('Couchbase initialized ;)');
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-b, --bucket [string]',
    description: 'bucket names',
  })
  parseString(val: string): CouchCommandOptions['bucket'] {
    return val.split(',');
  }

  private cond(bucket: string, options?: CouchCommandOptions): boolean {
    return (
      (typeof options?.bucket === 'boolean' && options.bucket) ||
      (typeof options?.bucket === 'object' && options.bucket.includes(bucket))
    );
  }
}
