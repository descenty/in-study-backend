import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { AuthModule, jwtModule } from './auth/auth.module';
import { JwtAuthMiddleware } from './auth/auth-middleware';

@Module({
  imports: [CourseModule, AuthModule, jwtModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes('*');
  }
}
