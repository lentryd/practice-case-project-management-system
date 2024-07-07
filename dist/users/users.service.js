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
exports.UsersService = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return (await this.prisma.user.findMany()).map(({ password, ...user }) => user);
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const { password, ...safeUser } = user;
        return safeUser;
    }
    async update(id, dto) {
        const { current_password, new_password, ...data } = dto;
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (data.email) {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser && existingUser.id !== id) {
                throw new common_1.BadRequestException('Email is already in use');
            }
        }
        if (new_password) {
            if (!current_password) {
                throw new common_1.BadRequestException('Current password is required to update the password');
            }
            const passwordMatches = await bcrypt.compare(current_password, user.password);
            if (!passwordMatches) {
                throw new common_1.BadRequestException('Current password is incorrect');
            }
            const hashedPassword = await bcrypt.hash(new_password, 10);
            data.password = hashedPassword;
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data,
        });
        const { password, ...safeUser } = updatedUser;
        return safeUser;
    }
    async delete(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        await this.prisma.user.delete({ where: { id } });
        return;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map