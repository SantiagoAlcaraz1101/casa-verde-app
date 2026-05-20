import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EcoActionConfigService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.ecoActionConfig.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async updatePoints(id: string, points: number) {
    return this.prisma.ecoActionConfig.update({
      where: { id },
      data: { points },
    });
  }

  async seedDefaults() {
    const count = await this.prisma.ecoActionConfig.count();

    if (count > 0) return;

    await this.prisma.ecoActionConfig.createMany({
      data: [
        {
          key: 'plastic',
          label: 'Reciclaje plástico',
          points: 10,
        },
        {
          key: 'organic',
          label: 'Residuos orgánicos',
          points: 8,
        },
        {
          key: 'glass',
          label: 'Reciclaje vidrio',
          points: 12,
        },
      ],
    });
  }
}
