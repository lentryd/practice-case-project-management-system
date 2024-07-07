import { IsDateString, IsOptional, IsString } from 'class-validator';

export default class UpdateStageDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  startDate?: Date;
  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
