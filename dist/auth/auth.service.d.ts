import { JwtService } from '@nestjs/jwt';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly jwt;
    private readonly prisma;
    constructor(jwt: JwtService, prisma: PrismaService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    register(dto: RegisterDto): Promise<{
        access_token: string;
    }>;
    private sighToken;
}
