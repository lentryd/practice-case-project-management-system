"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskDto = exports.CreateTaskDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
class BaseTaskDto {
}
exports.default = BaseTaskDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The task name',
        example: 'Task 1',
    }),
    __metadata("design:type", String)
], BaseTaskDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_2.ApiProperty)({
        description: 'The task description',
        example: 'This is the first task',
        required: false,
    }),
    __metadata("design:type", String)
], BaseTaskDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The stage identifier',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], BaseTaskDto.prototype, "stageId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The project identifier',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], BaseTaskDto.prototype, "projectId", void 0);
class CreateTaskDto extends BaseTaskDto {
}
exports.CreateTaskDto = CreateTaskDto;
class UpdateTaskDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(BaseTaskDto, ['projectId'])) {
}
exports.UpdateTaskDto = UpdateTaskDto;
//# sourceMappingURL=task.dto.js.map