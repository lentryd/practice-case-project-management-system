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
const events_service_1 = require("../events/events.service");
let TasksService = class TasksService {
    constructor(prisma, eventsService) {
        this.prisma = prisma;
        this.eventsService = eventsService;
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
        if (data.startDate >= data.endDate) {
            throw new common_1.BadRequestException('End date must be after start date');
        }
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
        const taskIndex = await this.prisma.task.count({
            where: { stageId: data.stageId },
        });
        if (data.indexAtStage > taskIndex + 1) {
            throw new common_1.BadRequestException('Invalid task index at stage');
        }
        await this.prisma.task.updateMany({
            where: {
                stageId: data.stageId,
                indexAtStage: { gte: data.indexAtStage },
            },
            data: { indexAtStage: { increment: 1 } },
        });
        const updatedTasks = await this.prisma.task.findMany({
            where: {
                stageId: data.stageId,
                indexAtStage: { gte: data.indexAtStage },
            },
        });
        this.eventsService.sendEventMany(events_service_1.EventType.TaskUpdated, updatedTasks);
        const task = await this.prisma.task.create({ data });
        this.eventsService.sendEvent(events_service_1.EventType.TaskCreated, task);
        return task;
    }
    async update(id, data) {
        const task = await this.findOne(id);
        if (!task) {
            throw new common_1.BadRequestException('Task not found');
        }
        data.startDate ??= task.startDate;
        data.endDate ??= task.endDate;
        if (data.startDate >= data.endDate) {
            throw new common_1.BadRequestException('End date must be after start date');
        }
        if (data.stageId) {
            const stage = await this.prisma.stage.findUnique({
                where: { id: data.stageId },
            });
            if (!stage) {
                throw new common_1.BadRequestException('Stage not found');
            }
        }
        if (data.stageId || data.indexAtStage) {
            const oldStageId = task.stageId;
            const oldIndexAtStage = task.indexAtStage;
            const newStageId = data.stageId ?? oldStageId;
            const newIndexAtStage = data.indexAtStage ?? oldIndexAtStage;
            const taskIndex = await this.prisma.task.count({
                where: { stageId: newStageId },
            });
            if (newIndexAtStage > taskIndex + 1) {
                throw new common_1.BadRequestException('Invalid task index at stage');
            }
            if (oldStageId !== newStageId) {
                await this.prisma.task.updateMany({
                    where: {
                        stageId: oldStageId,
                        indexAtStage: { gt: oldIndexAtStage },
                    },
                    data: { indexAtStage: { decrement: 1 } },
                });
                await this.prisma.task.updateMany({
                    where: {
                        stageId: newStageId,
                        indexAtStage: { gte: newIndexAtStage },
                    },
                    data: { indexAtStage: { increment: 1 } },
                });
            }
            else {
                if (newIndexAtStage < oldIndexAtStage) {
                    await this.prisma.task.updateMany({
                        where: {
                            stageId: oldStageId,
                            indexAtStage: {
                                gte: newIndexAtStage,
                                lt: oldIndexAtStage,
                            },
                        },
                        data: { indexAtStage: { increment: 1 } },
                    });
                }
                else if (newIndexAtStage > oldIndexAtStage) {
                    await this.prisma.task.updateMany({
                        where: {
                            stageId: oldStageId,
                            indexAtStage: {
                                gt: oldIndexAtStage,
                                lte: newIndexAtStage,
                            },
                        },
                        data: { indexAtStage: { decrement: 1 } },
                    });
                }
            }
        }
        const updatedTask = await this.prisma.task.update({ where: { id }, data });
        if (task.stageId === updatedTask.stageId) {
            this.eventsService.sendEvent(events_service_1.EventType.TaskUpdated, updatedTask);
        }
        else {
            await this.prisma.task
                .findMany({
                where: {
                    OR: [{ stageId: task.stageId }, { stageId: updatedTask.stageId }],
                },
            })
                .then((tasks) => this.eventsService.sendEventMany(events_service_1.EventType.TaskUpdated, tasks));
        }
        return updatedTask;
    }
    async delete(id) {
        const task = await this.findOne(id);
        if (!task) {
            throw new common_1.BadRequestException('Task not found');
        }
        await this.prisma.task.delete({ where: { id } });
        this.eventsService.sendEvent(events_service_1.EventType.TaskDeleted, task);
        return;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        events_service_1.EventsService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map