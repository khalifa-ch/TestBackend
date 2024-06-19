import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateAgentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
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

  @IsOptional()
  @IsString()
  photo: string;
}
