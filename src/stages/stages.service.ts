import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStageDto, UpdateStageDto } from './stage.dto';

@Injectable()
export class StagesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find all stages
   * @returns all stages
   */
  async findAll() {
    return this.prisma.stage.findMany();
  }

  /**
   * Find a stage by id
   * @param id id of the stage
   * @returns the stage
   */
  async findOne(id: string) {
    return this.prisma.stage.findUnique({
      where: { id },
    });
  }

  /**
   * Find stages by project id
   * @param projectId id of the project
   * @returns the stages
   */
  async findByProjectId(projectId: string) {
    return this.prisma.stage.findMany({
      where: {
        projectId,
      },
    });
  }

  /**
   * Create a stage
   * @param data stage data
   * @returns the created stage
   */
  async create(data: CreateStageDto) {
    // Check if start date is before end date
    if (data.startDate >= data.endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    return this.prisma.stage.create({ data });
  }

  /**
   * Update a stage
   * @param id id of the stage
   * @param data stage data
   * @returns the updated stage
   */
  async update(id: string, data: UpdateStageDto) {
    // Check if stage exists
    const stage = await this.prisma.stage.findUnique({ where: { id } });
    if (!stage) {
      throw new BadRequestException('Stage not found');
    }

    // Check if start date is before end date
    data.startDate ??= stage.startDate;
    data.endDate ??= stage.endDate;
    if (data.startDate >= data.endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    return this.prisma.stage.update({ where: { id }, data });
  }

  /**
   * Delete a stage
   * @param id id of the stage
   * @returns the deleted stage
   */
  async delete(id: string) {
    // Check if stage exists
    const stage = await this.prisma.stage.findUnique({ where: { id } });
    if (!stage) {
      throw new BadRequestException('Stage not found');
    }

    await this.prisma.stage.delete({ where: { id } });
    return;
  }
}
