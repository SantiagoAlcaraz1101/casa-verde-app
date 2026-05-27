import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EcoActionsModule } from './eco-actions/eco-actions.module';
import { RankingModule } from './ranking/ranking.module';
import { WasteGuideModule } from './waste-guide/waste-guide.module';
import { EcoActionConfigModule } from './eco-action-config/eco-action-config.module';
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    EcoActionsModule,
    RankingModule,
    WasteGuideModule,
    EcoActionConfigModule,
    RewardsModule,
  ],
})
export class AppModule {}
