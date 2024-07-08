import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './users.dto';
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
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        name: string | null;
        email: string;
    }>;
    delete(id: string): Promise<void>;
}
