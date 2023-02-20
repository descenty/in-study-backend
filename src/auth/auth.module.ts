import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

export const jwtModule = JwtModule.register(
  {
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '24h' }
  }
)

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [jwtModule]
})
export class AuthModule { }
