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
exports.UpdateStageDto = exports.CreateStageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
class BaseStageDto {
}
exports.default = BaseStageDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The stage name',
        example: 'Stage 1',
    }),
    __metadata("design:type", String)
], BaseStageDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_2.ApiProperty)({
        description: 'The stage description',
        example: 'This is the first stage',
        required: false,
    }),
    __metadata("design:type", String)
], BaseStageDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The start date of the stage',
        example: '2021-01-01T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], BaseStageDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The end date of the stage',
        example: '2021-01-02T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], BaseStageDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The project identifier',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], BaseStageDto.prototype, "projectId", void 0);
class CreateStageDto extends BaseStageDto {
}
exports.CreateStageDto = CreateStageDto;
class UpdateStageDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(BaseStageDto, ['projectId'])) {
}
exports.UpdateStageDto = UpdateStageDto;
//# sourceMappingURL=stage.dto.js.map