import BaseUserDto from '../users/users.dto';
export default class BaseProjectDto {
    id: string;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    owner: BaseUserDto;
}
declare const CreateProjectDto_base: import("@nestjs/common").Type<Omit<BaseProjectDto, "id" | "createdAt" | "updatedAt" | "ownerId" | "owner">>;
export declare class CreateProjectDto extends CreateProjectDto_base {
}
declare const UpdateProjectDto_base: import("@nestjs/common").Type<Partial<Omit<BaseProjectDto, "id" | "createdAt" | "updatedAt" | "ownerId" | "owner">>>;
export declare class UpdateProjectDto extends UpdateProjectDto_base {
}
export declare class AddMemberDto {
    id: string;
}
export {};
