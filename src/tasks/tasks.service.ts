import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { EventsService, EventType } from 'src/events/events.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsService: EventsService,
  ) {}

  /**
   * Find all tasks
   * @returns all tasks
   */
  async findAll() {
    return this.prisma.task.findMany();
  }

  /**
   * Find a task by id
   * @param id id of the task
   * @returns a task
   */
  async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  /**
   * Find tasks by stage id
   * @param stageId id of the stage
   * @returns the tasks
   */
  async findByStageId(stageId: string) {
    return this.prisma.task.findMany({
      where: { stageId },
    });
  }

  /**
   * Find tasks by project id
   * @param projectId id of the project
   * @returns the tasks
   */
  async findByProjectId(projectId: string) {
    return this.prisma.task.findMany({
      where: { projectId },
    });
  }

  /**
   * Create a task
   * @param data task data
   * @returns the created task
   */
  async create(data: CreateTaskDto) {
    // Check if start date is before end date
    if (data.startDate >= data.endDate) {
      throw new BadRequestException('End date must be after start date');
    }
    // Check if stage exists
    const stage = await this.prisma.stage.findUnique({
      where: { id: data.stageId },
    });
    if (!stage) {
      throw new BadRequestException('Stage not found');
    }
    // Check if project exists
    const project = await this.prisma.project.findUnique({
      where: { id: data.projectId },
    });
    if (!project) {
      throw new BadRequestException('Project not found');
    }

    // Check if task index is valid
    const taskIndex = await this.prisma.task.count({
      where: { stageId: data.stageId },
    });
    if (data.indexAtStage > taskIndex + 1) {
      throw new BadRequestException('Invalid task index at stage');
    }
    // Update task indexes
    await this.prisma.task.updateMany({
      where: {
        stageId: data.stageId,
        indexAtStage: { gte: data.indexAtStage },
      },
      data: { indexAtStage: { increment: 1 } },
    });

    // Create task and send event
    const task = await this.prisma.task.create({ data });
    this.eventsService.sendEvent(EventType.TaskCreated, task);

    return task;
  }

  /**
   * Update a task
   * @param id id of the task
   * @param data task data
   * @returns the updated task
   */
  async update(id: string, data: UpdateTaskDto) {
    // Check if task exists
    const task = await this.findOne(id);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    // Check if start date is before end date
    data.startDate ??= task.startDate;
    data.endDate ??= task.endDate;
    if (data.startDate >= data.endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    // Check if stage exists
    if (data.stageId) {
      const stage = await this.prisma.stage.findUnique({
        where: { id: data.stageId },
      });
      if (!stage) {
        throw new BadRequestException('Stage not found');
      }
    }

    // Check if task index is valid
    if (data.indexAtStage) {
      const taskIndex = await this.prisma.task.count({
        where: { stageId: data.stageId },
      });
      if (data.indexAtStage > taskIndex + 1) {
        throw new BadRequestException('Invalid task index at stage');
      }

      // Update task indexes
      await this.prisma.task.updateMany({
        where: {
          stageId: data.stageId,
          indexAtStage: { gte: data.indexAtStage },
        },
        data: { indexAtStage: { increment: 1 } },
      });
    }

    // Update task and send event
    const updatedTask = await this.prisma.task.update({ where: { id }, data });
    this.eventsService.sendEvent(EventType.TaskUpdated, updatedTask);

    return updatedTask;
  }

  /**
   * Delete a task
   * @param id id of the task
   * @returns the deleted task
   */
  async delete(id: string) {
    // Check if task exists
    const task = await this.findOne(id);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    // Delete task and send event
    await this.prisma.task.delete({ where: { id } });
    this.eventsService.sendEvent(EventType.TaskDeleted, task);

    return;
  }
}
