import { connect, start, model as Model, getDefaultInstance } from 'ottoman';
import { ConnectOptions } from 'ottoman/lib/types/ottoman/ottoman';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';

import { OTTOMAN_CONNECTION } from './ottoman.const';

@Module({})
export class OttomanModule {
  protected static scope: string;
  static token = (name: string) => `ottoman.${OttomanModule.scope}.${name}`;

  static forRoot(scope: string, options: ConnectOptions): DynamicModule {
    OttomanModule.scope = scope;
    connect(options)
      .then(() => start())
      .catch(console.error);
    return {
      global: true,
      module: OttomanModule,
      providers: [
        {
          provide: OTTOMAN_CONNECTION,
          useValue: getDefaultInstance(),
        },
      ],
      exports: [OTTOMAN_CONNECTION],
    };
  }

  static forFeature(models: ModelDefinition[]): DynamicModule {
    const providers: Provider[] = [];
    for (const model of models) {
      const options = { scopeName: this.scope, collectionName: model.collection };
      const useValue = Model(model.name, model.schema, options);
      providers.push({ provide: this.token(model.name), useValue });
    }
    return { module: OttomanModule, providers, exports: providers };
  }
}
