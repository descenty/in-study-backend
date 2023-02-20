import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { jwtModule } from 'src/auth/auth.module';

@Module({
  controllers: [CourseController],
  providers: [CourseService, PrismaService],
  imports: [jwtModule]
})
export class CourseModule { }
