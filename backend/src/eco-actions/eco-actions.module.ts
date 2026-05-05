import { Module } from '@nestjs/common';
import { EcoActionsService } from './eco-actions.service';
import { EcoActionsController } from './eco-actions.controller';

@Module({
  providers: [EcoActionsService],
  controllers: [EcoActionsController]
})
export class EcoActionsModule {}
