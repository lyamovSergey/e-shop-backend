import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ColorDto {
  @IsString({
    message: 'Name is required',
  })
  @ApiProperty({ description: 'Color name', nullable: false })
  name: string;
  @IsString({
    message: 'Value is required',
  })
  @ApiProperty({ description: 'Color code HEX', nullable: false })
  value: string;
}
