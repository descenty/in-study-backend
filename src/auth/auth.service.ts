import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) { }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  async login(userDto: CreateUserDto) {
    const user = await this.prismaService.user.findFirst({ where: { email: userDto.email } })
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if (user && passwordEquals) {
      return this.generateToken(user)
    }
    throw new UnauthorizedException('Некорректный email или пароль')
  }
  async registration(userDto: CreateUserDto) {
    const user = await this.prismaService.user.findFirst({ where: { email: userDto.email } })
    if (user)
      throw new BadRequestException('Пользователь с таким email уже существует')
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const createdUser = await this.prismaService.user.create({ data: { ...userDto, password: hashPassword } })
    return this.generateToken(createdUser)
  }

  async getUserData(id: number) {
    return await this.prismaService.user.findFirst({ where: { id } })
  }
}