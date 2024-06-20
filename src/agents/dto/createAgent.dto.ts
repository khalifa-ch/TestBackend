import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateAgentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'Name must be at least 2 characters long',
  })
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('TN', { message: 'Phone number must be a valid TN number' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  destinationGroup: string;

  @IsNotEmpty()
  registrationDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  canMakeCalls: boolean;

  @IsNotEmpty()
  @IsString()
  photo: string;
}