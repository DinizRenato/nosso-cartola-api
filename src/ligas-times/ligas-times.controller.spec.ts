import { Test, TestingModule } from '@nestjs/testing';
import { LigasTimesController } from './ligas-times.controller';

describe('LigasTimesController', () => {
  let controller: LigasTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LigasTimesController],
    }).compile();

    controller = module.get<LigasTimesController>(LigasTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
