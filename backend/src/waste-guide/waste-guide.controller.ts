import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { WasteGuideService } from './waste-guide.service';
import { CreateWasteItemDto } from './dto/create-waste-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('waste-guide')
export class WasteGuideController {
  constructor(private readonly wasteGuideService: WasteGuideService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createWasteItemDto: CreateWasteItemDto) {
    return this.wasteGuideService.create(createWasteItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.wasteGuideService.findAll();
  }
}
