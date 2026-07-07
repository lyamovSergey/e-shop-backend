import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Auth()
  @Get('list')
  async getStoreList(@CurrentUser('id') userId: string) {
    return await this.storeService.getStoreList(userId);
  }

  @Auth()
  @Get('get-by-id/:id')
  async getStoreById(
    @Param('id') storeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.storeService.getStoreById(storeId, userId);
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
  @Put('update/:id')
  async updateStore(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateStoreDto,
    @Param('id') storeId: string,
  ) {
    return await this.storeService.updateStore(storeId, userId, dto);
  }
  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async deleteStore(
    @CurrentUser('id') userId: string,
    @Param('id') storeId: string,
  ) {
    return await this.storeService.deleteStore(storeId, userId);
  }
}
