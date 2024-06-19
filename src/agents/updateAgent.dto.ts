import { IsBoolean, IsDateString, IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateAgentDto {
    @IsOptional()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsPhoneNumber()
    phoneNumber: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    destinationGroup?: string;
  
    @IsOptional()
    @IsDateString()
    registrationDate?: Date;
  
    @IsOptional()
    @IsBoolean()
    canMakeCalls?: boolean;
  
    @IsOptional()
    @IsString()
    photo?: string;
  }
  