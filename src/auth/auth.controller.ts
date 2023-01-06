import { Body, Controller, Post, Req } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('/login')
  @HttpCode(200)
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  @HttpCode(200)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserData(@Req() request: any) {
    return this.authService.getUserData(+request.user.id)
  }
}
