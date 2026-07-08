import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  private getSearchTermFilter(searchTerm: string) {
    return {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  async getAllProducts(searchTerm: string) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm);
    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
    return products;
  }

  async getByStoreId(storeId: string) {
    return this.prisma.product.findMany({
      where: {
        storeId,
      },
      include: {
        category: true,
        color: true,
      },
    });
  }

  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        color: true,
        reviews: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getByCategory(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          id: categoryId,
        },
      },
      include: {
        category: true,
      },
    });
    if (!products) throw new NotFoundException('Products not found');
    return products;
  }

  async getMostPopular() {
    const mostPopularProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 10,
    });

    const productIds = mostPopularProducts.map((product) => product.productId);
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        category: true,
      },
    });

    return products;
  }

  async getSimilar(id: string) {
    const currentProduct = await this.getById(id);
    if (!currentProduct) throw new NotFoundException('Product not found');
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category?.name,
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
    return products;
  }
}
