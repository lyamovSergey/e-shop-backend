import { ApiProperty } from '@nestjs/swagger';
import { CreateStoreDto } from 'src/store/dto/create-store.dto';

export class ResponseStoreDto extends CreateStoreDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  userId: string;
}
