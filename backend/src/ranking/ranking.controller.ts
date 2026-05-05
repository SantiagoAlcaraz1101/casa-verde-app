import { Controller, Get, UseGuards } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getRanking() {
    return this.rankingService.getRanking();
  }
}
