import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from '../Decorators/MatchDecorator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Match('password', {
    message: 'ConfirmPassword must match Password',
  })
  confirmPassword: string;
}
