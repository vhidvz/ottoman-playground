import { ConnectOptions } from 'ottoman/lib/types/ottoman/ottoman';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Ottoman, getDefaultInstance } from 'ottoman';
import { ModelDefinition } from '@nestjs/mongoose';

import { OTTOMAN_CONNECTION } from './ottoman.const';

@Module({})
export class OttomanModule {
  protected static scope: string;
  protected static ottoman: Ottoman;

  static token = (name: string) => `ottoman.${OttomanModule.scope}.${name}`;

  static forRoot(scope: string, options: ConnectOptions): DynamicModule {
    this.scope = scope;
    this.ottoman = getDefaultInstance() || new Ottoman({ scopeName: scope });

    console.log(
      '\x1b[33m%s\x1b[0m',
      `[ottoman] Please, make sure the '${options.bucketName}' bucket with the '${scope}' scope exists.`,
    );
    this.ottoman.connect(options).catch(console.error);

    return {
      global: true,
      module: OttomanModule,
      providers: [
        {
          provide: OTTOMAN_CONNECTION,
          useFactory: () => this.ottoman,
        },
      ],
      exports: [OTTOMAN_CONNECTION],
    };
  }

  static forFeature(models: ModelDefinition[]): DynamicModule {
    const providers: Provider[] = [];
    for (const model of models) {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `[ottoman] Please, make sure the [scope: '${this.scope}'].[collection: '${model.collection || model.name}'] exists.`,
      );

      const options = { scopeName: this.scope, collectionName: model.collection };
      const useValue = this.ottoman.model(model.name, model.schema, options);
      providers.push({ provide: this.token(model.name), useValue });
    }
    return { module: OttomanModule, providers, exports: providers };
  }
}
