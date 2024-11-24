import { forwardRef, Inject } from '@nestjs/common';

import { OttomanModule } from './ottoman.module';
import { OTTOMAN_CONNECTION } from './ottoman.const';

export const InjectModel = (name: string) => Inject(forwardRef(() => OttomanModule.token(name)));

export const InjectConnection = () => Inject(OTTOMAN_CONNECTION);
