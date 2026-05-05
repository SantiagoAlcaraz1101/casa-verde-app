import { Module } from '@nestjs/common';
import { WasteGuideService } from './waste-guide.service';
import { WasteGuideController } from './waste-guide.controller';

@Module({
  providers: [WasteGuideService],
  controllers: [WasteGuideController]
})
export class WasteGuideModule {}
