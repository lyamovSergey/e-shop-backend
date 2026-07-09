import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReviewDto } from './dto/review.dto';
import { CurrentUser } from 'src/user/decorators/user.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.reviewService.getByStoreId(storeId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('/add')
  async create(
    @CurrentUser('id') userId: string,
    @Query('productId') productId: string,
    @Query('storeId') storeId: string,
    @Body() dto: ReviewDto,
  ) {
    return await this.reviewService.create(userId, productId, storeId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async deleteStore(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.reviewService.delete(id, userId);
  }
}
