import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty()
  @IsString({
    message: 'Title is required and must be a string',
  })
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  logo: string;
}
