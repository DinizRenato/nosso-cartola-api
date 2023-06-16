import { Test, TestingModule } from '@nestjs/testing';
import { UsersRodadasService } from './users-rodadas.service';

describe('UsersRodadasService', () => {
  let service: UsersRodadasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRodadasService],
    }).compile();

    service = module.get<UsersRodadasService>(UsersRodadasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
