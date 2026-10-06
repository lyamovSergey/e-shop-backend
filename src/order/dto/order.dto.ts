import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsEnum(EnumOrderStatus, {
    message: `Status must be a ${Object.values(EnumOrderStatus).join(' ')}`,
  })
  status: EnumOrderStatus;

  @ApiProperty()
  @IsArray({
    message: 'В заказе нет ни одного товара',
  })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
export class OrderItemDto {
  @ApiProperty()
  @IsNumber({}, { message: 'quantity must be a number' })
  quantity: number;

  @ApiProperty()
  @IsString({ message: 'title must be a string' })
  title: string;

  @ApiProperty()
  @IsNumber({}, { message: 'price must be a number' })
  price: number;

  @ApiProperty()
  @IsString({ message: 'productId must be a string' })
  productId: string;

  @ApiProperty()
  @IsString({ message: 'storeId must be a string' })
  storeId: string;
}

export class ResponseOrderItemDto {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  storeId: string;
}

export class ResponseOrderDto {
  @ApiProperty({
    enum: EnumOrderStatus,
  })
  status: EnumOrderStatus;

  @ApiProperty({
    type: () => ResponseOrderItemDto,
    isArray: true,
  })
  items: ResponseOrderItemDto[];
}
