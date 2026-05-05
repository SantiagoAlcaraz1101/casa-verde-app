import { Test, TestingModule } from '@nestjs/testing';
import { WasteGuideService } from './waste-guide.service';

describe('WasteGuideService', () => {
  let service: WasteGuideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WasteGuideService],
    }).compile();

    service = module.get<WasteGuideService>(WasteGuideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
