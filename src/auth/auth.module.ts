import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.register(
      {
        secret: process.env.SECRET_KEY,
        signOptions: { expiresIn: '24h' }
      }
    )
  ]
})
export class AuthModule { }
