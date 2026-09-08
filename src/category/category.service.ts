import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { EnumUserRole } from 'src/generated/prisma/enums';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany();
  }

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

  async createCategory(dto: CategoryDto, storeId?: string) {
    return await this.prisma.category.create({
      data: { ...dto, ...(storeId && { storeId: storeId }) },
    });
  }

  async updateCategory(
    id: string,
    dto: CategoryDto,
    userRole: EnumUserRole,
    storeId: string | undefined,
  ) {
    const category = await this.getCategoryById(id);
    if (!category) throw new NotFoundException('Category not found');
    if (
      userRole !== EnumUserRole.ADMIN &&
      (userRole !== EnumUserRole.SALER || category.storeId !== storeId)
    )
      throw new ForbiddenException('Error permissions!');
    return await this.prisma.category.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteCategory(
    id: string,
    storeId: string | undefined,
    userRole: EnumUserRole,
  ) {
    const category = await this.getCategoryById(id);
    if (!category) throw new NotFoundException('Category not found');
    if (
      userRole !== EnumUserRole.ADMIN &&
      (userRole !== EnumUserRole.SALER || category.storeId !== storeId)
    )
      throw new ForbiddenException('Error permissions!');

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
