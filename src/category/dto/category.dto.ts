import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  @IsString({
    message: 'Description must be a string',
  })
  description?: string;

  @IsOptional()
  @IsString({
    message: 'Parent ID must be a string',
  })
  parentId?: string;
}
