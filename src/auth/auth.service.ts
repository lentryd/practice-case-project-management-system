import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import RegisterDto from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (
      !user ||
      (await bcrypt.compare(dto.password, user.password)) === false
    ) {
      throw new BadRequestException('Wrong email or password');
    }

    return this.sighToken(user.id, user.email);
  }

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
      },
    });

    return this.sighToken(user.id, user.email);
  }

  private async sighToken(sub: string, email: string) {
    return {
      access_token: await this.jwt.signAsync({ sub, email }),
    };
  }
}
