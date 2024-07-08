import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, AddMemberDto } from './projects.dto';
import { StagesService } from '../stages/stages.service';
import BaseStageDto, { UpdateStageDto } from '../stages/stage.dto';
declare const CreateStageDto_base: import("@nestjs/mapped-types").MappedType<Omit<BaseStageDto, "projectId">>;
declare class CreateStageDto extends CreateStageDto_base {
}
import { TasksService } from '../tasks/tasks.service';
import BaseTaskDto, { UpdateTaskDto } from '../tasks/task.dto';
declare const CreateTaskDto_base: import("@nestjs/mapped-types").MappedType<Omit<BaseTaskDto, "projectId">>;
declare class CreateTaskDto extends CreateTaskDto_base {
}
export declare class ProjectsController {
    private readonly tasksService;
    private readonly stagesService;
    private readonly projectsService;
    constructor(tasksService: TasksService, stagesService: StagesService, projectsService: ProjectsService);
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
    create(data: CreateProjectDto, req: any): Promise<{
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
    delete(id: string, req: any): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        ownerId: string;
    }>;
    findTasks(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        stageId: string;
        projectId: string;
    }[]>;
    createTask(id: string, data: CreateTaskDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        stageId: string;
        projectId: string;
    }>;
    updateTask(taskId: string, data: UpdateTaskDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        stageId: string;
        projectId: string;
    }>;
    removeTask(taskId: string): Promise<void>;
    findStages(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }[]>;
    createStage(id: string, data: CreateStageDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }>;
    updateStage(stageId: string, data: UpdateStageDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
    }>;
    removeStage(stageId: string): Promise<void>;
    findMembers(id: string): Promise<{
        id: string;
        name: string;
        email: string;
    }[]>;
    addMember(id: string, data: AddMemberDto): Promise<{
        id: string;
        name: string | null;
        email: string;
    }>;
    removeMember(id: string, memberId: string): Promise<void>;
}
export {};
