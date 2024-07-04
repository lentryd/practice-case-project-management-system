import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export default class UserUpdateDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  @Length(8, 32)
  readonly new_password?: string;

  @IsOptional()
  @IsString()
  readonly current_password?: string;
}
