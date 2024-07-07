export default class BaseTaskDto {
    name: string;
    description?: string;
    stageId: string;
    projectId: string;
}
export declare class CreateTaskDto extends BaseTaskDto {
}
declare const UpdateTaskDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<BaseTaskDto, "projectId">>>;
export declare class UpdateTaskDto extends UpdateTaskDto_base {
}
export {};
