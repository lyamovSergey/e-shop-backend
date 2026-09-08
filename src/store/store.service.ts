import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { EnumUserRole } from 'src/generated/prisma/enums';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async getStoreList(userId: string) {
    return await this.prisma.store.findMany({
      where: { userId },
    });
  }

  async getStoreListFull() {
    return await this.prisma.store.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getStoreById(storeId: string, userId: string, userRole: EnumUserRole) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store || (userRole !== EnumUserRole.ADMIN && store.userId !== userId))
      throw new NotFoundException('Store not found');

    return store;
  }

  async createStore(userId: string, dto: CreateStoreDto) {
    return await this.prisma.store.create({
      data: {
        title: dto.title,
        description: dto.description,
        logo: dto.logo,
        userId,
      },
    });
  }

  async updateStore(
    storeId: string,
    userId: string,
    userRole: EnumUserRole,
    dto: UpdateStoreDto,
  ) {
    await this.getStoreById(storeId, userId, userRole);
    return await this.prisma.store.update({
      where: { id: storeId },
      data: {
        ...dto,
      },
    });
  }

  async deleteStore(storeId: string, userId: string, userRole: EnumUserRole) {
    await this.getStoreById(storeId, userId, userRole);
    return this.prisma.store.delete({
      where: { id: storeId },
    });
  }
}
