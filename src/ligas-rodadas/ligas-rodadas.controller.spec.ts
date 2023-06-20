import { Test, TestingModule } from '@nestjs/testing';
import { LigasRodadasController } from './ligas-rodadas.controller';

describe('LigasRodadasController', () => {
  let controller: LigasRodadasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LigasRodadasController],
    }).compile();

    controller = module.get<LigasRodadasController>(LigasRodadasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
