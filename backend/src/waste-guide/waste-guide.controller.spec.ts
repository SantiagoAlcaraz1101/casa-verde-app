import { Test, TestingModule } from '@nestjs/testing';
import { WasteGuideController } from './waste-guide.controller';

describe('WasteGuideController', () => {
  let controller: WasteGuideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WasteGuideController],
    }).compile();

    controller = module.get<WasteGuideController>(WasteGuideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
