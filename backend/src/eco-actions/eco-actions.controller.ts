import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EcoActionsService } from './eco-actions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('eco-actions')
export class EcoActionsController {
  constructor(private readonly ecoActionsService: EcoActionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body) {
    const userId = req.user.id;
    return this.ecoActionsService.create(
      userId,
      body.type,
      body.points,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.ecoActionsService.findByUser(userId);
  }
}
