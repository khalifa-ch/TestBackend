import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from './Decorators/MatchDecorator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', {
    message: 'ConfirmPassword must match Password',
  })
  confirmPassword: string;
}
