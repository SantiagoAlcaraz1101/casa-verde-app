import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWasteItemDto } from './dto/create-waste-item.dto';

@Injectable()
export class WasteGuideService {
  constructor(private prisma: PrismaService) {}

  async create(createWasteItemDto: CreateWasteItemDto) {
    return this.prisma.wasteItem.create({
      data: createWasteItemDto,
    });
  }

  async findAll() {
    return this.prisma.wasteItem.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
