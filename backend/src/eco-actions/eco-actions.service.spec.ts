import { Test, TestingModule } from '@nestjs/testing';
import { EcoActionsService } from './eco-actions.service';

describe('EcoActionsService', () => {
  let service: EcoActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcoActionsService],
    }).compile();

    service = module.get<EcoActionsService>(EcoActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
