import { Test, TestingModule } from '@nestjs/testing';
import { UsersRodadasController } from './users-rodadas.controller';

describe('UsersRodadasController', () => {
  let controller: UsersRodadasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersRodadasController],
    }).compile();

    controller = module.get<UsersRodadasController>(UsersRodadasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
