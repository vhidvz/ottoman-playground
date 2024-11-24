import { Command, CommandRunner } from 'nest-commander';
import { Inject, Injectable } from '@nestjs/common';
import { COUCH_CONFIG } from '@app/common/envs';
import { HttpService } from '@nestjs/axios';

import { COUCH_OPTIONS } from './couch.const';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async init(_options?: CouchCommandOptions): Promise<void> {
    console.log('Initializing couchbase...');

    const { bucketName, username, password } = this.config;
    const ramQuotaMB = +process.env.COUCH_RAM_QUOTA_MB || 256;

    console.log(
      '\x1b[33m%s\x1b[0m',
      `Manually configure couchbase credentials with the username: ${username} and password: ${password}`,
    );

    console.log(
      '\x1b[33m%s\x1b[0m',
      `Configure couchbase buckets with a new bucket with the name of ${bucketName} and ramQuotaMB: ${ramQuotaMB}`,
    );

    const port = +process.env.COUCH_PORT || 8091;
    const base = +process.env.COUCH_BASE || 'http://localhost';

    const baseURL = `${base}:${port}`;
    console.log('\x1b[33m%s\x1b[0m', `Couchbase configuration panel is located at the ${baseURL} link location.`);

    console.log('Couchbase initialized ;)');
  }
}
