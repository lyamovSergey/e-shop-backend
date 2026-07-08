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
import { ColorService } from './color.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ColorDto } from './dto/color.dto';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return await this.colorService.getByStoreId(storeId);
  }

  @Auth()
  @Get('by-id/:colorId')
  async getById(@Param('colorId') colorId: string) {
    return this.colorService.getById(colorId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':storeId')
  async createColor(@Param('storeId') storeId: string, @Body() dto: ColorDto) {
    return await this.colorService.create(storeId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':colorId')
  async updateStore(@Body() dto: ColorDto, @Param('colorId') colorId: string) {
    return await this.colorService.update(colorId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':colorId')
  async deleteStore(@Param('colorId') colorId: string) {
    return await this.colorService.delete(colorId);
  }
}
