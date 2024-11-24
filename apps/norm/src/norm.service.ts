import { InjectModel } from '@app/sdk/ottoman';
import { Injectable } from '@nestjs/common';
import { ModelTypes } from 'ottoman';

@Injectable()
export class NormService {
  constructor(@InjectModel("norm") protected readonly model: ModelTypes) { }

  async getHello() {
    return this.model.count()
  }
}
