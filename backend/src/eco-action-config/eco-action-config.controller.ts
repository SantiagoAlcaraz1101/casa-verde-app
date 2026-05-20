import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { EcoActionConfigService } from './eco-action-config.service';

@Controller('eco-action-config')
export class EcoActionConfigController {
  constructor(
    private readonly ecoActionConfigService: EcoActionConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.ecoActionConfigService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  updatePoints(
    @Param('id') id: string,
    @Body() body: { points: number },
  ) {
    return this.ecoActionConfigService.updatePoints(id, Number(body.points));
  }
}
