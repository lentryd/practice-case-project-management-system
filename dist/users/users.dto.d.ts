export default class BaseUserDto {
    id: string;
    name: string;
    email: string;
}
declare const CreateUserDto_base: import("@nestjs/common").Type<Omit<BaseUserDto, "id">>;
export declare class CreateUserDto extends CreateUserDto_base {
    password: string;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "password">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    readonly new_password?: string;
    readonly current_password?: string;
}
export {};
