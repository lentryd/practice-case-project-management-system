import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ProjectsService } from './projects.service';
import { StagesService } from '../stages/stages.service';
import AddMemberDto from './dto/add-member.dto';
import CreateStageDto from '../stages/dto/create-stage.dto';
import UpdateStageDto from '../stages/dto/update-stage.dto';
import CreateProjectDto from './dto/create-project.dto';
import UpdateProjectDto from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly stagesService: StagesService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: CreateProjectDto, @Request() req) {
    return this.projectsService.create({ ...data, ownerId: req.user.id });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() data: UpdateProjectDto) {
    return this.projectsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string, @Request() req) {
    return this.projectsService.delete(id, req.user.id);
  }

  @Get(':id/stages')
  @UseGuards(AuthGuard)
  async findStages(@Param('id') id: string) {
    return this.stagesService.findByProjectId(id);
  }

  @Post(':id/stages')
  @UseGuards(AuthGuard)
  async createStage(
    @Param('id') id: string,
    @Body() data: Omit<CreateStageDto, 'projectId'>,
  ) {
    return this.stagesService.create({ ...data, projectId: id });
  }

  @Put(':id/stages/:stageId')
  @UseGuards(AuthGuard)
  async updateStage(
    @Param('stageId') stageId: string,
    @Body() data: UpdateStageDto,
  ) {
    return this.stagesService.update(stageId, data);
  }

  @Delete(':id/stages/:stageId')
  @UseGuards(AuthGuard)
  async removeStage(@Param('stageId') stageId: string) {
    return this.stagesService.delete(stageId);
  }

  @Get(':id/members')
  @UseGuards(AuthGuard)
  async findMembers(@Param('id') id: string) {
    return this.projectsService.findMembers(id);
  }

  @Post(':id/members')
  @UseGuards(AuthGuard)
  async addMember(@Param('id') id: string, @Body() data: AddMemberDto) {
    return this.projectsService.addMember(id, data.id);
  }

  @Delete(':id/members/:memberId')
  @UseGuards(AuthGuard)
  async removeMember(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
  ) {
    return this.projectsService.removeMember(id, memberId);
  }
}
