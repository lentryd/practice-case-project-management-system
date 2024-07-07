import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import CreateProjectDto from './dto/create-project.dto';
import UpdateProjectDto from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find all projects
   * @returns all projects
   */
  async findAll() {
    return this.prisma.project.findMany();
  }

  /**
   * Find a project by id
   * @param id id of the project
   * @returns the project
   */
  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },

      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  /**
   * Create a project
   * @param data project data
   * @returns the created project
   */
  async create(data: CreateProjectDto & { ownerId: string }) {
    // Check if start date is before end date
    if (data.startDate >= data.endDate) {
      throw new BadRequestException('End date must be after start date');
    }

    return this.prisma.project.create({
      data,
    });
  }

  /**
   * Update a project
   * @param id id of the project
   * @param data project data
   * @returns the updated project
   */
  async update(id: string, data: UpdateProjectDto) {
    // Check if project exists
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new BadRequestException('Project not found');
    }

    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a project
   * @param id id of the project
   * @param userId id of the user
   * @returns the deleted project
   */
  async delete(id: string, userId: string) {
    // Check if project exists
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new BadRequestException('Project not found');
    }
    // Check if user is the owner of the project
    if (project.ownerId !== userId) {
      throw new BadRequestException('You are not the owner of this project');
    }

    return this.prisma.project.delete({
      where: { id },
    });
  }

  /**
   * Find all members of a project
   * @param id id of the project
   * @returns all members of the project
   */
  async findMembers(id: string) {
    // Check if project exists
    const project = await this.prisma.project.findUnique({
      where: { id },

      include: {
        members: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    if (!project) {
      throw new BadRequestException('Project not found');
    }

    return project.members;
  }

  /**
   * Add a member to a project
   * @param projectId id of the project
   * @param memberId id of the member
   * @returns the member added to the project
   */
  async addMember(projectId: string, memberId: string) {
    // Check if project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      throw new BadRequestException('Project not found');
    }
    // Check if member exists
    const member = await this.prisma.user.findUnique({
      where: { id: memberId },
    });
    if (!member) {
      throw new BadRequestException('User not found');
    }

    // Add member to project and return the member
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

  /**
   * Remove a member from a project
   * @param projectId id of the project
   * @param memberId id of the member
   * @returns an empty object
   */
  async removeMember(projectId: string, memberId: string) {
    // Check if project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      throw new BadRequestException('Project not found');
    }
    // Check if member exists
    const member = await this.prisma.user.findUnique({
      where: { id: memberId },
    });
    if (!member) {
      throw new BadRequestException('User not found');
    }

    // Remove member from project
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
}
