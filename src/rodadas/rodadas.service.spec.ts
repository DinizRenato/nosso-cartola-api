import { Test, TestingModule } from '@nestjs/testing';
import { RodadasService } from './rodadas.service';

describe('RodadasService', () => {
  let service: RodadasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RodadasService],
    }).compile();

    service = module.get<RodadasService>(RodadasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
