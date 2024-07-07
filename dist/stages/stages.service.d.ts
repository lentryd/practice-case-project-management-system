import { PrismaService } from '../prisma/prisma.service';
import { CreateStageDto, UpdateStageDto } from './stage.dto';
export declare class StagesService {
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
        projectId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }>;
    findByProjectId(projectId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }[]>;
    create(data: CreateStageDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }>;
    update(id: string, data: UpdateStageDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }>;
    delete(id: string): Promise<void>;
}
