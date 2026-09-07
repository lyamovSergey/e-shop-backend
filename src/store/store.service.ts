import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async getStoreList(userId: string) {
    return await this.prisma.store.findMany({
      where: { userId },
    });
  }

  async getStoreListFull() {
    return await this.prisma.store.findMany();
  }

  async getStoreById(storeId: string, userId: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId, userId },
    });
    if (!store) throw new NotFoundException('Store not found');
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

  async updateStore(storeId: string, userId: string, dto: UpdateStoreDto) {
    await this.getStoreById(storeId, userId);
    return await this.prisma.store.update({
      where: { id: storeId },
      data: {
        ...dto,
      },
    });
  }

  async deleteStore(storeId: string, userId: string) {
    await this.getStoreById(storeId, userId);
    return this.prisma.store.delete({
      where: { id: storeId },
    });
  }
}
