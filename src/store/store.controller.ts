import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { EnumUserRole } from 'src/generated/prisma/enums';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Auth()
  @Get('list')
  async getStoreList(@CurrentUser('id') userId: string) {
    return await this.storeService.getStoreList(userId);
  }

  @Auth()
  @Roles(EnumUserRole.ADMIN)
  @Get('full-list')
  async getStoreListFull() {
    return await this.storeService.getStoreListFull();
  }

  @Auth()
  @Get('get-by-id/:id')
  async getStoreById(
    @Param('id') storeId: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: EnumUserRole,
  ) {
    return await this.storeService.getStoreById(storeId, userId, userRole);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createStore(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateStoreDto,
  ) {
    return await this.storeService.createStore(userId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Patch('update/:id')
  async updateStore(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: EnumUserRole,
    @Body() dto: UpdateStoreDto,
    @Param('id') storeId: string,
  ) {
    return await this.storeService.updateStore(storeId, userId, userRole, dto);
  }
  @HttpCode(200)
  @Auth()
  @Roles(EnumUserRole.ADMIN)
  @Delete(':id')
  async deleteStore(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') userRole: EnumUserRole,
    @Param('id') storeId: string,
  ) {
    return await this.storeService.deleteStore(storeId, userId, userRole);
  }
}
