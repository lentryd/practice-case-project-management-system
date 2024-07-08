export default class BaseStageDto {
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    projectId: string;
}
export declare class CreateStageDto extends BaseStageDto {
}
declare const UpdateStageDto_base: import("@nestjs/common").Type<Partial<Omit<BaseStageDto, "projectId">>>;
export declare class UpdateStageDto extends UpdateStageDto_base {
}
export {};
