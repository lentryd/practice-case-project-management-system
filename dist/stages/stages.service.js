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
exports.StagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const events_service_1 = require("../events/events.service");
let StagesService = class StagesService {
    constructor(prisma, eventsService) {
        this.prisma = prisma;
        this.eventsService = eventsService;
    }
    async findAll() {
        return this.prisma.stage.findMany();
    }
    async findOne(id) {
        return this.prisma.stage.findUnique({
            where: { id },
        });
    }
    async findByProjectId(projectId) {
        return this.prisma.stage.findMany({
            where: {
                projectId,
            },
        });
    }
    async create(data) {
        if (data.startDate >= data.endDate) {
            throw new common_1.BadRequestException('End date must be after start date');
        }
        const project = await this.prisma.project.findUnique({
            where: { id: data.projectId },
        });
        if (!project) {
            throw new common_1.BadRequestException('Project not found');
        }
        const stage = await this.prisma.stage.create({ data });
        this.eventsService.sendEvent(events_service_1.EventType.StageCreated, stage);
        return stage;
    }
    async update(id, data) {
        const stage = await this.prisma.stage.findUnique({ where: { id } });
        if (!stage) {
            throw new common_1.BadRequestException('Stage not found');
        }
        data.startDate ??= stage.startDate;
        data.endDate ??= stage.endDate;
        if (data.startDate >= data.endDate) {
            throw new common_1.BadRequestException('End date must be after start date');
        }
        const updatedStage = await this.prisma.stage.update({
            where: { id },
            data,
        });
        this.eventsService.sendEvent(events_service_1.EventType.StageUpdated, updatedStage);
        return updatedStage;
    }
    async delete(id) {
        const stage = await this.prisma.stage.findUnique({ where: { id } });
        if (!stage) {
            throw new common_1.BadRequestException('Stage not found');
        }
        await this.prisma.stage.delete({ where: { id } });
        this.eventsService.sendEvent(events_service_1.EventType.StageDeleted, stage);
        return;
    }
};
exports.StagesService = StagesService;
exports.StagesService = StagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        events_service_1.EventsService])
], StagesService);
//# sourceMappingURL=stages.service.js.map