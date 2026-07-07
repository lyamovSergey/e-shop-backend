import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getByStoreId(storeId: string) {
    return this.prisma.category.findMany({
      where: {
        storeId,
      },
    });
  }

  async getCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async createCategory(storeId: string, dto: CategoryDto) {
    return await this.prisma.category.create({
      data: { ...dto, storeId },
    });
  }

  async updateCategory(id: string, dto: CategoryDto) {
    await this.getCategoryById(id);
    return await this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async deleteCategory(id: string) {
    await this.getCategoryById(id);
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
