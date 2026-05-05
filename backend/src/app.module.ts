import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EcoActionsModule } from './eco-actions/eco-actions.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, EcoActionsModule, RankingModule],
})
export class AppModule {}
