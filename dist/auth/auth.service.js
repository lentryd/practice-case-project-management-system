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
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(jwt, prisma) {
        this.jwt = jwt;
        this.prisma = prisma;
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user ||
            (await bcrypt.compare(dto.password, user.password)) === false) {
            throw new common_1.UnauthorizedException('Wrong email or password');
        }
        return this.sighToken(user.id, user.email);
    }
    async register(dto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (userExists) {
            throw new common_1.UnauthorizedException('User with this email already exists');
        }
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: await bcrypt.hash(dto.password, 10),
            },
        });
        return this.sighToken(user.id, user.email);
    }
    async sighToken(sub, email) {
        return {
            access_token: await this.jwt.signAsync({ sub, email }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map