import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EnumOrderStatus } from 'src/generated/prisma/enums';

export class OrderDto {
  @IsOptional()
  @IsEnum(EnumOrderStatus, {
    message: `Status must be a ${Object.values(EnumOrderStatus).join(' ')}`,
  })
  status: EnumOrderStatus;

  @IsArray({
    message: 'В заказе нет ни одного товара',
  })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
export class OrderItemDto {
  @IsNumber({}, { message: 'quantity must be a number' })
  quantity: number;

  @IsString({ message: 'title must be a string' })
  title: string;

  @IsNumber({}, { message: 'price must be a number' })
  price: number;

  @IsString({ message: 'productId must be a string' })
  productId: string;

  @IsString({ message: 'storeId must be a string' })
  storeId: string;
}
