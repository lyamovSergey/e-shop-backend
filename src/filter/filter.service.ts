import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterDto } from 'src/filter/dto/filter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(categoryId: string, dto: FilterDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) throw new NotFoundException('Category not found');

    const filter = await this.prisma.filter.findUnique({
      where: {
        categoryId_name: {
          categoryId,
          name: dto.name,
        },
      },
    });
    if (filter) throw new ConflictException('Filter already exists');

    return this.prisma.filter.create({
      data: {
        name: dto.name,
        categoryId,
        data: {
          create: dto.data,
        },
      },
      include: {
        data: true,
      },
    });
  }

  async update(filterId: string, dto: FilterDto) {
    const filter = await this.prisma.filter.findUnique({
      where: {
        id: filterId,
      },
    });
    if (!filter) throw new NotFoundException('Filter not found');
    return this.prisma.$transaction(async (tx) => {
      await tx.filterValue.deleteMany({
        where: {
          filterId,
        },
      });

      return tx.filter.update({
        where: {
          id: filterId,
        },
        data: {
          name: dto.name,
          data: {
            create: dto.data,
          },
        },
        include: {
          data: true,
        },
      });
    });
  }

  async delete(filterId: string) {
    const filter = await this.prisma.filter.findUnique({
      where: {
        id: filterId,
      },
    });
    if (!filter) throw new NotFoundException('Filter not found');

    return this.prisma.filter.delete({
      where: { id: filterId },
    });
  }
}
