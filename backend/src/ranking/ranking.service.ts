import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService) {}

  async getRanking() {
    return this.prisma.user.findMany({
      where: {
        role: Role.USER,
      },
      orderBy: {
        points: 'desc',
      },
      select: {
        id: true,
        name: true,
        points: true,
      },
    });
  }
}
