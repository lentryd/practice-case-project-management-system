import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { EventsService } from 'src/events/events.service';
export declare class TasksService {
    private readonly prisma;
    private readonly eventsService;
    constructor(prisma: PrismaService, eventsService: EventsService);
    findAll(): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        stageId: string;
        projectId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        stageId: string;
        projectId: string;
    }>;
    findByStageId(stageId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        stageId: string;
        projectId: string;
    }[]>;
    findByProjectId(projectId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        stageId: string;
        projectId: string;
    }[]>;
    create(data: CreateTaskDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        stageId: string;
        projectId: string;
    }>;
    update(id: string, data: UpdateTaskDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        stageId: string;
        projectId: string;
    }>;
    delete(id: string): Promise<void>;
}
