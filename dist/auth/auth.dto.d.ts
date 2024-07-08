import { CreateUserDto } from 'src/users/users.dto';
declare const LoginDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "email" | "password">>;
export default class LoginDto extends LoginDto_base {
}
export {};
