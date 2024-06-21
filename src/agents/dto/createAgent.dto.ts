import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'Name must be at least 2 characters long',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumber('TN', { message: 'Phone number must be a valid TN number' })
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  destinationGroup: string;

  @ApiProperty()
  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  @IsBoolean()
  canMakeCalls: boolean;

  @IsOptional()
  @ApiPropertyOptional({ type: 'string', format: 'binary', required: true })
  photo?: string;
}
