import { Test, TestingModule } from '@nestjs/testing';
import { RodadasController } from './rodadas.controller';

describe('RodadasController', () => {
  let controller: RodadasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RodadasController],
    }).compile();

    controller = module.get<RodadasController>(RodadasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
