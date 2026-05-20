import { Test, TestingModule } from '@nestjs/testing';
import { EcoActionConfigController } from './eco-action-config.controller';

describe('EcoActionConfigController', () => {
  let controller: EcoActionConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcoActionConfigController],
    }).compile();

    controller = module.get<EcoActionConfigController>(EcoActionConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
