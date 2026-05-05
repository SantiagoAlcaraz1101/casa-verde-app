import { Test, TestingModule } from '@nestjs/testing';
import { EcoActionsController } from './eco-actions.controller';

describe('EcoActionsController', () => {
  let controller: EcoActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcoActionsController],
    }).compile();

    controller = module.get<EcoActionsController>(EcoActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
