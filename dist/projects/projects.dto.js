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
exports.AddMemberDto = exports.UpdateProjectDto = exports.CreateProjectDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class BaseProjectDto {
}
exports.default = BaseProjectDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The project ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: 'uuid',
    }),
    __metadata("design:type", String)
], BaseProjectDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The project name',
        example: 'Project 1',
    }),
    __metadata("design:type", String)
], BaseProjectDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The project description',
        example: 'This is a project',
    }),
    __metadata("design:type", String)
], BaseProjectDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The project start date',
        example: '2021-01-01T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], BaseProjectDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The project end date',
        example: '2021-01-02T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], BaseProjectDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The project creation date',
        example: '2021-01-01T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], BaseProjectDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The project update date',
        example: '2021-01-01T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], BaseProjectDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The project owner ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], BaseProjectDto.prototype, "ownerId", void 0);
class CreateProjectDto extends (0, swagger_1.OmitType)(BaseProjectDto, [
    'id',
    'createdAt',
    'updatedAt',
    'ownerId',
    'owner',
]) {
}
exports.CreateProjectDto = CreateProjectDto;
class UpdateProjectDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(BaseProjectDto, [
    'id',
    'createdAt',
    'updatedAt',
    'ownerId',
    'owner',
])) {
}
exports.UpdateProjectDto = UpdateProjectDto;
class AddMemberDto {
}
exports.AddMemberDto = AddMemberDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The user ID to add to the project',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], AddMemberDto.prototype, "id", void 0);
//# sourceMappingURL=projects.dto.js.map