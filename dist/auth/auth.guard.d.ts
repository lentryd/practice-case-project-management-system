import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthGuard implements CanActivate {
    private readonly jwt;
    private readonly config;
    private readonly prisma;
    constructor(jwt: JwtService, config: ConfigService, prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private validateUser;
    private validateToken;
    private extractTokenFromHeader;
}
