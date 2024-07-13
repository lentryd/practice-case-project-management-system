export default class BaseTaskDto {
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    indexAtStage: number;
    stageId: string;
    projectId: string;
}
export declare class CreateTaskDto extends BaseTaskDto {
}
declare const UpdateTaskDto_base: import("@nestjs/common").Type<Partial<Omit<BaseTaskDto, "projectId">>>;
export declare class UpdateTaskDto extends UpdateTaskDto_base {
}
export {};
