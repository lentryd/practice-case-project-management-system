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
exports.UpdateUserDto = exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BaseUserDto {
}
exports.default = BaseUserDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The user identifier',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], BaseUserDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The user name',
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], BaseUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The user email',
        example: 'me@gmail.com',
    }),
    __metadata("design:type", String)
], BaseUserDto.prototype, "email", void 0);
class CreateUserDto extends (0, swagger_1.OmitType)(BaseUserDto, ['id']) {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_2.ApiProperty)({
        description: 'The user password',
        example: '12345678',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
class UpdateUserDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(CreateUserDto, ['password'])) {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_2.ApiProperty)({
        description: 'The user new password',
        example: '12345678',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "new_password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_2.ApiProperty)({
        description: 'The user current password',
        example: '12345678',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "current_password", void 0);
//# sourceMappingURL=users.dto.js.map