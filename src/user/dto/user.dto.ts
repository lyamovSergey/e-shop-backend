import { ApiProperty } from '@nestjs/swagger';

import { EnumUserRole } from 'src/generated/prisma/enums';
import { ResponseOrderDto } from 'src/order/dto/order.dto';
import { ResponseStoreDto } from 'src/store/dto/store.dto';

export class UserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  picture: string;
  @ApiProperty({
    enum: EnumUserRole,
    default: EnumUserRole.USER,
  })
  role: EnumUserRole;
  @ApiProperty({
    nullable: true,
    type: () => ResponseStoreDto,
  })
  store: ResponseStoreDto | null;
  // @ApiProperty()
  favorites: ResponseOrderDto[] | [];
  @ApiProperty({
    type: () => ResponseOrderDto,
    isArray: true,
  })
  orders: ResponseOrderDto[];
}
