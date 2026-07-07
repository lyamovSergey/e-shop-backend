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
import { CategoryService } from './category.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return await this.categoryService.getByStoreId(storeId);
  }

  @Auth()
  @Get('by-id/:categoryId')
  async getById(@Param('categoryId') categoryId: string) {
    return this.categoryService.getCategoryById(categoryId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':storeId')
  async createCategory(
    @Param('storeId') storeId: string,
    @Body() dto: CategoryDto,
  ) {
    return await this.categoryService.createCategory(storeId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':categoryId')
  async updateStore(
    @Body() dto: CategoryDto,
    @Param('categoryId') categoryId: string,
  ) {
    return await this.categoryService.updateCategory(categoryId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':categoryId')
  async deleteStore(@Param('categoryId') categoryId: string) {
    return await this.categoryService.deleteCategory(categoryId);
  }
}
