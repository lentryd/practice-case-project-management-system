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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const events_service_1 = require("../events/events.service");
let ProjectsService = class ProjectsService {
    constructor(prisma, eventsService) {
        this.prisma = prisma;
        this.eventsService = eventsService;
    }
    async findAll() {
        return this.prisma.project.findMany();
    }
    async findOne(id) {
        return this.prisma.project.findUnique({
            where: { id },
            include: {
                owner: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
    }
    async create(data) {
        if (data.startDate >= data.endDate) {
            throw new common_1.BadRequestException('End date must be after start date');
        }
        const project = this.prisma.project.create({
            data,
        });
        this.eventsService.sendEvent(events_service_1.EventType.ProjectCreated, project);
        return project;
    }
    async update(id, data) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) {
            throw new common_1.BadRequestException('Project not found');
        }
        const updatedProject = await this.prisma.project.update({
            where: { id },
            data,
        });
        this.eventsService.sendEvent(events_service_1.EventType.ProjectUpdated, updatedProject);
        return updatedProject;
    }
    async delete(id, userId) {
        const project = await this.prisma.project.findUnique({ where: { id } });
        if (!project) {
            throw new common_1.BadRequestException('Project not found');
        }
        if (project.ownerId !== userId) {
            throw new common_1.BadRequestException('You are not the owner of this project');
        }
        await this.prisma.project.delete({
            where: { id },
        });
        this.eventsService.sendEvent(events_service_1.EventType.ProjectDeleted, project);
        return;
    }
    async findMembers(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                members: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
        if (!project) {
            throw new common_1.BadRequestException('Project not found');
        }
        return project.members;
    }
    async addMember(projectId, memberId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new common_1.BadRequestException('Project not found');
        }
        const member = await this.prisma.user.findUnique({
            where: { id: memberId },
        });
        if (!member) {
            throw new common_1.BadRequestException('User not found');
        }
        await this.prisma.project.update({
            where: { id: projectId },
            data: {
                members: {
                    connect: { id: memberId },
                },
            },
        });
        const { password, ...memberWithoutPassword } = member;
        return memberWithoutPassword;
    }
    async removeMember(projectId, memberId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new common_1.BadRequestException('Project not found');
        }
        const member = await this.prisma.user.findUnique({
            where: { id: memberId },
        });
        if (!member) {
            throw new common_1.BadRequestException('User not found');
        }
        await this.prisma.project.update({
            where: { id: projectId },
            data: {
                members: {
                    disconnect: { id: memberId },
                },
            },
        });
        return;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        events_service_1.EventsService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map