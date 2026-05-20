import { Module } from '@nestjs/common';
import { EcoActionConfigController } from './eco-action-config.controller';
import { EcoActionConfigService } from './eco-action-config.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EcoActionConfigController],
  providers: [EcoActionConfigService],
  exports: [EcoActionConfigService],
})
export class EcoActionConfigModule {}
