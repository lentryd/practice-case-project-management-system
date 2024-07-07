import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { StagesService } from '../stages/stages.service';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, StagesService, TasksService],
})
export class ProjectsModule {}
