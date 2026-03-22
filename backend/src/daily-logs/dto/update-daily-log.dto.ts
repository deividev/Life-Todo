import { IsOptional, IsBoolean, IsIn, IsString } from 'class-validator';

export class UpdateDailyLogDto {
  @IsOptional() @IsBoolean() breakfast?: boolean;
  @IsOptional() @IsBoolean() lunch?: boolean;
  @IsOptional() @IsBoolean() snack?: boolean;
  @IsOptional() @IsBoolean() dinner?: boolean;
  @IsOptional() @IsString() @IsIn(['none', 'walk', 'exercise', 'walk_and_exercise']) activityType?: string;
  @IsOptional() @IsString() @IsIn(['low', 'medium', 'high']) energy?: string;
  @IsOptional() @IsString() @IsIn(['low', 'normal', 'high']) appetite?: string;
  @IsOptional() @IsString() note?: string;
}
