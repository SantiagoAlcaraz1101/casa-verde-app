import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EcoActionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, type: string, points: number) {
    const action = await this.prisma.ecoAction.create({
      data: {
        userId,
        type,
        points,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        points: {
          increment: points,
        },
      },
    });

    return action;
  }

  async findByUser(userId: string) {
    return this.prisma.ecoAction.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
