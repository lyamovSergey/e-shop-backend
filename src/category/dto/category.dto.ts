import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString({
    message: 'Name is required',
  })
  name: string;
  @IsString({
    message: 'Description is required',
  })
  description: string;
}
