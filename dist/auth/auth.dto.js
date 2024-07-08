"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const users_dto_1 = require("../users/users.dto");
class LoginDto extends (0, swagger_1.PickType)(users_dto_1.CreateUserDto, [
    'email',
    'password',
]) {
}
exports.default = LoginDto;
//# sourceMappingURL=auth.dto.js.map