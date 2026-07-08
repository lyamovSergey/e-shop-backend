import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewDto {
  @IsString({
    message: 'text must be a string',
  })
  @IsNotEmpty({
    message: 'text is required',
  })
  text: string;

  @IsNumber(
    {},
    {
      message: 'rating must be a number',
    },
  )
  @Min(1, { message: 'Min 1' })
  @Max(5, { message: 'Max 5' })
  @IsNotEmpty({
    message: 'rating is required',
  })
  rating: number;
}
