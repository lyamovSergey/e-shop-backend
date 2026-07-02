import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from './strategies/google.strategy';

export interface JwtPayload {
  id: string;
}
export type GoogleRequest = Request & {
  user: GoogleUser;
};

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = this.createTokens(user.id);
    return { user, ...tokens };
  }

  async register(dto: AuthDto) {
    const currentUser = await this.userService.getUserByEmail(dto.email);
    if (currentUser) throw new BadRequestException('User already exists');

    const user = await this.userService.createUser(dto);
    const tokens = this.createTokens(user.id);
    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync<JwtPayload>(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token');
    const user = await this.userService.getUserById(result.id);
    const tokens = this.createTokens(result.id);
    return { user, ...tokens };
  }

  createTokens(userId: string) {
    const data: JwtPayload = { id: userId };
    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async validateOAuthLogin(req: GoogleRequest) {
    let user = await this.userService.getUserByEmail(req.user.email);
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: req.user.email,
          name: req.user.name,
          picture: req.user.picture,
        },
        include: {
          stores: true,
          favorites: true,
          orders: true,
        },
      });
    }
    const tokens = this.createTokens(user.id);
    return { user, ...tokens };
  }
  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: expiresIn,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
  }
  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
  }
}
