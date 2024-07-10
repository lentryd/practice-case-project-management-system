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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const mapped_types_1 = require("@nestjs/mapped-types");
const auth_guard_1 = require("../auth/auth.guard");
const projects_service_1 = require("./projects.service");
const projects_dto_1 = require("./projects.dto");
const stages_service_1 = require("../stages/stages.service");
const stage_dto_1 = require("../stages/stage.dto");
class CreateStageDto extends (0, mapped_types_1.OmitType)(stage_dto_1.default, ['projectId']) {
}
const tasks_service_1 = require("../tasks/tasks.service");
const task_dto_1 = require("../tasks/task.dto");
const swagger_1 = require("@nestjs/swagger");
const users_dto_1 = require("../users/users.dto");
class CreateTaskDto extends (0, mapped_types_1.OmitType)(task_dto_1.default, ['projectId']) {
}
let ProjectsController = class ProjectsController {
    constructor(tasksService, stagesService, projectsService) {
        this.tasksService = tasksService;
        this.stagesService = stagesService;
        this.projectsService = projectsService;
    }
    async findAll() {
        return this.projectsService.findAll();
    }
    async findOne(id) {
        return this.projectsService.findOne(id);
    }
    async create(data, req) {
        return this.projectsService.create({ ...data, ownerId: req.user.id });
    }
    async update(id, data) {
        return this.projectsService.update(id, data);
    }
    async delete(id, req) {
        return this.projectsService.delete(id, req.user.id);
    }
    async findTasks(id) {
        return this.tasksService.findByProjectId(id);
    }
    async createTask(id, data) {
        return this.tasksService.create({ ...data, projectId: id });
    }
    async updateTask(taskId, data) {
        return this.tasksService.update(taskId, data);
    }
    async removeTask(taskId) {
        return this.tasksService.delete(taskId);
    }
    async findStages(id) {
        return this.stagesService.findByProjectId(id);
    }
    async createStage(id, data) {
        return this.stagesService.create({ ...data, projectId: id });
    }
    async updateStage(stageId, data) {
        return this.stagesService.update(stageId, data);
    }
    async removeStage(stageId) {
        return this.stagesService.delete(stageId);
    }
    async findMembers(id) {
        return this.projectsService.findMembers(id);
    }
    async addMember(id, data) {
        return this.projectsService.addMember(id, data.id);
    }
    async removeMember(id, memberId) {
        return this.projectsService.removeMember(id, memberId);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Find all projects' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All projects',
        type: [projects_dto_1.default],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Find a project by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The project',
        type: projects_dto_1.default,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a project' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The project has been successfully created.',
        type: projects_dto_1.default,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [projects_dto_1.CreateProjectDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The project has been successfully updated.',
        type: projects_dto_1.default,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, projects_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The project has been successfully deleted.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/tasks'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Find all tasks of a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All tasks of the project',
        type: [task_dto_1.default],
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findTasks", null);
__decorate([
    (0, common_1.Post)(':id/tasks'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a task for a project' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The task has been successfully created.',
        type: task_dto_1.default,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateTaskDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createTask", null);
__decorate([
    (0, common_1.Put)(':id/tasks/:taskId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a task of a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The task has been successfully updated.',
        type: task_dto_1.default,
    }),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)(':id/tasks/:taskId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a task of a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The task has been successfully deleted.',
    }),
    __param(0, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "removeTask", null);
__decorate([
    (0, common_1.Get)(':id/stages'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Find all stages of a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All stages of the project',
        type: [stage_dto_1.default],
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findStages", null);
__decorate([
    (0, common_1.Post)(':id/stages'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a stage for a project' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The stage has been successfully created.',
        type: stage_dto_1.default,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateStageDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createStage", null);
__decorate([
    (0, common_1.Put)(':id/stages/:stageId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a stage of a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The stage has been successfully updated.',
        type: stage_dto_1.default,
    }),
    __param(0, (0, common_1.Param)('stageId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, stage_dto_1.UpdateStageDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateStage", null);
__decorate([
    (0, common_1.Delete)(':id/stages/:stageId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a stage of a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The stage has been successfully deleted.',
    }),
    __param(0, (0, common_1.Param)('stageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "removeStage", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Find all members of a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'All members of the project',
        type: [users_dto_1.default],
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findMembers", null);
__decorate([
    (0, common_1.Post)(':id/members'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Add a member to a project' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The member has been successfully added.',
        type: users_dto_1.default,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, projects_dto_1.AddMemberDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)(':id/members/:memberId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a member from a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The member has been successfully removed.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "removeMember", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('projects'),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService,
        stages_service_1.StagesService,
        projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map