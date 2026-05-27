import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  async create(createRewardDto: CreateRewardDto) {
    const { name, description, pointsCost, stock } = createRewardDto;

    if (!name || !description) {
      throw new BadRequestException('Nombre y descripción son obligatorios');
    }

    if (pointsCost <= 0) {
      throw new BadRequestException('El costo en puntos debe ser mayor a 0');
    }

    if (stock < 0) {
      throw new BadRequestException('El stock no puede ser negativo');
    }

    return this.prisma.reward.create({
      data: {
        name,
        description,
        pointsCost,
        stock,
      },
    });
  }

  async findAll() {
    return this.prisma.reward.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAvailable() {
    return this.prisma.reward.findMany({
      where: {
        isActive: true,
        stock: {
          gt: 0,
        },
      },
      orderBy: {
        pointsCost: 'asc',
      },
    });
  }

  async update(id: string, updateRewardDto: UpdateRewardDto) {
    const reward = await this.prisma.reward.findUnique({
      where: { id },
    });

    if (!reward) {
      throw new NotFoundException('Recompensa no encontrada');
    }

    if (
      updateRewardDto.pointsCost !== undefined &&
      updateRewardDto.pointsCost <= 0
    ) {
      throw new BadRequestException('El costo en puntos debe ser mayor a 0');
    }

    if (
      updateRewardDto.stock !== undefined &&
      updateRewardDto.stock < 0
    ) {
      throw new BadRequestException('El stock no puede ser negativo');
    }

    return this.prisma.reward.update({
      where: { id },
      data: updateRewardDto,
    });
  }

  async redeem(userId: string, rewardId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.role === Role.ADMIN) {
      throw new BadRequestException(
        'Los administradores no pueden canjear recompensas',
      );
    }

    const reward = await this.prisma.reward.findUnique({
      where: { id: rewardId },
    });

    if (!reward) {
      throw new NotFoundException('Recompensa no encontrada');
    }

    if (!reward.isActive) {
      throw new BadRequestException('La recompensa no está activa');
    }

    if (reward.stock <= 0) {
      throw new BadRequestException('La recompensa no tiene stock disponible');
    }

    if (user.points < reward.pointsCost) {
      throw new BadRequestException('No tienes puntos suficientes');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          points: {
            decrement: reward.pointsCost,
          },
        },
      });

      await tx.reward.update({
        where: { id: rewardId },
        data: {
          stock: {
            decrement: 1,
          },
        },
      });

      const redemption = await tx.redemption.create({
        data: {
          userId,
          rewardId,
          pointsUsed: reward.pointsCost,
        },
        include: {
          reward: true,
        },
      });

      return redemption;
    });
  }

  async findMyRedemptions(userId: string) {
    return this.prisma.redemption.findMany({
      where: { userId },
      include: {
        reward: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(id: string) {
    const reward = await this.prisma.reward.findUnique({
      where: { id },
    });

    if (!reward) {
      throw new NotFoundException('Recompensa no encontrada');
    }

    return this.prisma.reward.delete({
      where: { id },
    });
  }
}
