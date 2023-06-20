import { Test, TestingModule } from '@nestjs/testing';
import { LigasRodadasService } from './ligas-rodadas.service';

describe('LigasRodadasService', () => {
  let service: LigasRodadasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LigasRodadasService],
    }).compile();

    service = module.get<LigasRodadasService>(LigasRodadasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
