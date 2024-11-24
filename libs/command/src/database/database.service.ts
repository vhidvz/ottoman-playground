import { Command, CommandRunner, Option } from 'nest-commander';
import { Injectable } from '@nestjs/common';

import { CouchService } from './couch';

interface DatabaseCommandOptions {
  database?: true | { couch?: boolean };
}

@Injectable()
@Command({
  name: 'db',
  arguments: '<task>',
  description: 'db commands',
  subCommands: [CouchService],
})
export class DatabaseService extends CommandRunner {
  constructor(private readonly couchService: CouchService) {
    super();
  }

  async run(passedParams: string[], options?: DatabaseCommandOptions): Promise<void> {
    if (passedParams.includes('init')) await this.init(options);

    process.exit();
  }

  async init(options?: DatabaseCommandOptions): Promise<void> {
    console.log('Seeding database...');

    if (this.cond('couch', options)) await this.couchService.init({ bucket: true });

    console.log('Database seeded ;)');
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-db, --database [string]',
    description: 'database',
  })
  parseString(val: string): DatabaseCommandOptions['database'] {
    return { couch: val.split(',').includes('couch') };
  }

  private cond(db: string, options?: DatabaseCommandOptions) {
    return (
      (typeof options?.database === 'boolean' && options.database) ||
      (typeof options?.database === 'object' && options.database[db])
    );
  }
}
