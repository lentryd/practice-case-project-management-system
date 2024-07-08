import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './projects.dto';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
    }[]>;
    findOne(id: string): Promise<{
        owner: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
    }>;
    create(data: CreateProjectDto & {
        ownerId: string;
    }): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
    }>;
    update(id: string, data: UpdateProjectDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
    }>;
    findMembers(id: string): Promise<{
        id: string;
        name: string;
        email: string;
    }[]>;
    addMember(projectId: string, memberId: string): Promise<{
        id: string;
        name: string | null;
        email: string;
    }>;
    removeMember(projectId: string, memberId: string): Promise<void>;
}
