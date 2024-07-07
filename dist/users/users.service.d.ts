import UserUpdateDto from './dto/user-update.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string | null;
        email: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string | null;
        email: string;
    }>;
    update(id: string, dto: UserUpdateDto): Promise<{
        id: string;
        name: string | null;
        email: string;
    }>;
    delete(id: string): Promise<void>;
}
