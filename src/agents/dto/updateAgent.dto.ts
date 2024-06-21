import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateAgentDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  name: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty({ required: false })
  phoneNumber: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  email?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  destinationGroup?: string;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  canMakeCalls?: boolean;
}
