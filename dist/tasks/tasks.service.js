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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.task.findMany();
    }
    async findOne(id) {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }
    async findByStageId(stageId) {
        return this.prisma.task.findMany({
            where: { stageId },
        });
    }
    async findByProjectId(projectId) {
        return this.prisma.task.findMany({
            where: { projectId },
        });
    }
    async create(data) {
        const stage = await this.prisma.stage.findUnique({
            where: { id: data.stageId },
        });
        if (!stage) {
            throw new common_1.BadRequestException('Stage not found');
        }
        const project = await this.prisma.project.findUnique({
            where: { id: data.projectId },
        });
        if (!project) {
            throw new common_1.BadRequestException('Project not found');
        }
        return this.prisma.task.create({ data });
    }
    async update(id, data) {
        const task = await this.findOne(id);
        if (!task) {
            throw new common_1.BadRequestException('Task not found');
        }
        if (data.stageId) {
            const stage = await this.prisma.stage.findUnique({
                where: { id: data.stageId },
            });
            if (!stage) {
                throw new common_1.BadRequestException('Stage not found');
            }
        }
        return this.prisma.task.update({ where: { id }, data });
    }
    async delete(id) {
        const task = await this.findOne(id);
        if (!task) {
            throw new common_1.BadRequestException('Task not found');
        }
        await this.prisma.task.delete({ where: { id } });
        return;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map