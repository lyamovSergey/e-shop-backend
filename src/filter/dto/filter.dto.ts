import { ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';

export interface IFilterData {
  name: string;
  value?: string;
}

export class FilterDto {
  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ArrayMinSize(1, {
    message: 'There must be at least one filter',
  })
  @IsNotEmpty({
    message: 'Filters value is required',
    each: true,
  })
  data: IFilterData[];
}
