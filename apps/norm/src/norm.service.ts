import { Injectable } from '@nestjs/common';

import { NormRepository } from './norm.repository';

@Injectable()
export class NormService {
  constructor(private readonly repository: NormRepository) {}

  async getHello() {
    return this.repository.count({});
  }
}
