import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { CouchService } from './couch.service';

describe('CouchService', () => {
  let service: CouchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouchService],
    }).compile();

    service = await module.resolve<CouchService>(CouchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
