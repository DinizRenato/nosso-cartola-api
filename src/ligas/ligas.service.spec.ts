import { Test, TestingModule } from '@nestjs/testing';
import { LigasService } from './ligas.service';

describe('LigasService', () => {
  let service: LigasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LigasService],
    }).compile();

    service = module.get<LigasService>(LigasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
