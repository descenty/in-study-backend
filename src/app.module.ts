import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CourseModule, AuthModule],
})
export class AppModule {}
