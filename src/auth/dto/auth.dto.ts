import { IsString, MinLength, IsOptional, IsEmail } from 'class-validator';
import { EnumUserRole } from 'src/generated/prisma/enums';
export class AuthDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString({
    message: 'Email is required',
  })
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString({
    message: 'Password is required',
  })
  password: string;
  role?: EnumUserRole;
}
