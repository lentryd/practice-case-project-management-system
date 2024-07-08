import { JwtService } from '@nestjs/jwt';
import LoginDto from './auth.dto';
import { CreateUserDto } from '../users/users.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly jwt;
    private readonly prisma;
    constructor(jwt: JwtService, prisma: PrismaService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    register(dto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    private sighToken;
}
