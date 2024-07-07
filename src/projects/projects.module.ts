import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { StagesService } from '../stages/stages.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, StagesService, UsersService],
})
export class ProjectsModule {}
