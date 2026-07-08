import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString({
    message: 'title must be a string',
  })
  @IsNotEmpty({
    message: 'title is required',
  })
  title: string;

  @IsString({
    message: 'description must be a string',
  })
  @IsNotEmpty({
    message: 'description is required',
  })
  description: string;

  @IsNumber(
    {},
    {
      message: 'price must be a number',
    },
  )
  @IsNotEmpty({
    message: 'price is required',
  })
  price: number;

  @ArrayMinSize(1, {
    message: 'there must be at least one picture',
  })
  @IsNotEmpty({
    message: 'images url is required',
    each: true,
  })
  images: string[];

  @IsString({
    message: 'categoryId must be a string',
  })
  @IsNotEmpty({
    message: 'categoryId is required',
  })
  categoryId: string;

  @IsString({
    message: 'colorId must be a string',
  })
  @IsNotEmpty({
    message: 'colorId is required',
  })
  colorId: string;
}
