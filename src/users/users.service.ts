import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import UserUpdateDto from './dto/user-update.dto';
import { PrismaService } from '../prisma/prisma.service';

type UserUpdateData = UserUpdateDto & { password?: string };

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return (await this.prisma.user.findMany()).map(
      ({ password, ...user }) => user,
    );
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { password, ...safeUser } = user;
    return safeUser;
  }

  async update(id: string, updateDto: UserUpdateDto) {
    const { current_password, new_password, ...data }: UserUpdateData =
      updateDto;
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Check if the email is already in use
    if (data.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Email is already in use');
      }
    }

    // Update the password if a new password is provided
    if (new_password) {
      if (!current_password) {
        throw new BadRequestException(
          'Current password is required to update the password',
        );
      }

      const passwordMatches = await bcrypt.compare(
        current_password,
        user.password,
      );
      if (!passwordMatches) {
        throw new BadRequestException('Current password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);
      data.password = hashedPassword;
    }

    // Update the user
    const updatedUser = await this.prisma.user.update({ where: { id }, data });
    const { password, ...safeUser } = updatedUser;
    return safeUser;
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
  }
}
