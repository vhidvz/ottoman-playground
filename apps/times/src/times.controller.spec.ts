import { Test, TestingModule } from '@nestjs/testing';

import { TimesService } from './times.service';
import { TimesController } from './times.controller';

describe('TimesController', () => {
  let timesController: TimesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TimesController],
      providers: [TimesService],
    }).compile();

    timesController = app.get<TimesController>(TimesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(timesController.getHello()).toBe('Hello World!');
    });
  });
});
