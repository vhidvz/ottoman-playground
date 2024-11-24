import { Test, TestingModule } from '@nestjs/testing';
import { NormController } from './norm.controller';
import { NormService } from './norm.service';

describe('NormController', () => {
  let normController: NormController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NormController],
      providers: [NormService],
    }).compile();

    normController = app.get<NormController>(NormController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(normController.getHello()).toBe('Hello World!');
    });
  });
});
