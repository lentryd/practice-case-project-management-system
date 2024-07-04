import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import UserUpdateDto from './dto/user-update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    if (id === 'me') {
      return req.user;
    } else {
      return this.users.findOne(id);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateDto: UserUpdateDto,
  ) {
    id = id === 'me' ? req.user.id : id;
    if (id !== req.user.id) {
      throw new BadRequestException('You can only update your own user');
    }
    return this.users.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string, @Request() req) {
    id = id === 'me' ? req.user.id : id;
    if (id !== req.user.id) {
      throw new BadRequestException('You can only delete your own user');
    }
    return this.users.delete(id);
  }
}
