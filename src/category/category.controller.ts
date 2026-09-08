import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryDto } from './dto/category.dto';
import { CurrentUser, UserWithStore } from 'src/user/decorators/user.decorator';
import { EnumUserRole } from 'src/generated/prisma/enums';

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

  @Get('list')
  async getAll() {
    return this.categoryService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('/create')
  async createCategory(
    @Body() dto: CategoryDto,
    @Query('storeId') storeId?: string,
  ) {
    return await this.categoryService.createCategory(dto, storeId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Patch(':categoryId')
  async updateCategory(
    @Body() dto: CategoryDto,
    @Param('categoryId') categoryId: string,
    @CurrentUser('store') store: UserWithStore['store'],
    @CurrentUser('role') userRole: EnumUserRole,
  ) {
    return await this.categoryService.updateCategory(
      categoryId,
      dto,
      userRole,
      store?.id,
    );
  }

  @HttpCode(200)
  @Auth()
  @Delete(':categoryId')
  async deleteStore(
    @Param('categoryId') categoryId: string,
    @CurrentUser('store') store: UserWithStore['store'],
    @CurrentUser('role') userRole: EnumUserRole,
  ) {
    return await this.categoryService.deleteCategory(
      categoryId,
      store?.id,
      userRole,
    );
  }
}
