import { IsNotEmpty, IsUUID } from 'class-validator';

export default class AddMemberDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
