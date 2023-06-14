import { Test, TestingModule } from '@nestjs/testing';
import { LigasTimesService } from './ligas-times.service';

describe('LigasTimesService', () => {
  let service: LigasTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LigasTimesService],
    }).compile();

    service = module.get<LigasTimesService>(LigasTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
