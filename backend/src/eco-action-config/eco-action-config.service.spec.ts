import { Test, TestingModule } from '@nestjs/testing';
import { EcoActionConfigService } from './eco-action-config.service';

describe('EcoActionConfigService', () => {
  let service: EcoActionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcoActionConfigService],
    }).compile();

    service = module.get<EcoActionConfigService>(EcoActionConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
