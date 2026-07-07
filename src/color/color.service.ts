import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
  constructor(private readonly prisma: PrismaService) {}

  async getByStoreId(storeId: string) {
    return this.prisma.color.findMany({
      where: {
        storeId,
      },
    });
  }

  async getColorById(id: string) {
    const color = await this.prisma.color.findUnique({
      where: { id },
    });
    if (!color) throw new NotFoundException('Color not found');
    return color;
  }

  async createColor(storeId: string, dto: ColorDto) {
    return await this.prisma.color.create({
      data: { ...dto, storeId },
    });
  }

  async updateColor(id: string, dto: ColorDto) {
    await this.getColorById(id);
    return await this.prisma.color.update({
      where: { id },
      data: dto,
    });
  }

  async deleteColor(id: string) {
    await this.getColorById(id);
    return this.prisma.color.delete({
      where: { id },
    });
  }
}
