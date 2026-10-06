import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { EnumUserRole } from 'src/generated/prisma/enums';
import { UserDto } from 'src/user/dto/user.dto';
export class AuthRegisterDto {
  @ApiProperty()
  // @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString({
    message: 'Email is required',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString({
    message: 'Password is required',
  })
  password: string;

  @ApiProperty({
    enum: EnumUserRole,
    default: EnumUserRole.USER,
  })
  role?: EnumUserRole;
}

export class AuthLoginDto {
  @ApiProperty()
  @IsString({
    message: 'Email is required',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString({
    message: 'Password is required',
  })
  password: string;

  @ApiProperty({
    enum: EnumUserRole,
    default: EnumUserRole.USER,
  })
  role?: EnumUserRole;
}

export class AuthResponseDto {
  @ApiProperty({ type: () => UserDto })
  user: UserDto;

  @ApiProperty()
  accessToken: string;
}
