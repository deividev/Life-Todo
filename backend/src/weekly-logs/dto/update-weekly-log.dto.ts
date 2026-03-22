import { IsOptional, IsNumber, IsIn, IsString } from 'class-validator';

export class UpdateWeeklyLogDto {
  @IsOptional() @IsNumber() weightKg?: number;
  @IsOptional() @IsNumber() waistCm?: number;
  @IsOptional() @IsNumber() armCm?: number;
  @IsOptional() @IsString() @IsIn(['worse', 'same', 'better']) weeklyFeeling?: string;
  @IsOptional() @IsString() note?: string;
}
