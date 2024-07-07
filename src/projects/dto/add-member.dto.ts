import { IsString } from 'class-validator';

export default class AddMemberDto {
  @IsString()
  id: string;
}
