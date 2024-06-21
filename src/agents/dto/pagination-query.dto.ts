import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsPositive,
  Min,
  IsString,
  IsDateString,
} from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @ApiProperty({required:false})
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @ApiProperty({required:false})
  @IsString()
  searchName?: string;
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @ApiProperty({required:false})
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @ApiProperty({required:false})
  @IsString()
  destinationGroup?: string;
}
