import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        stores: true,
        favorites: true,
        orders: true,
      },
    });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        stores: true,
        favorites: true,
        orders: true,
      },
    });
    return user;
  }

  async createUser(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
      },
    });
  }
}
