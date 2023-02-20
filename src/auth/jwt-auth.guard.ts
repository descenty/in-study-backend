import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { User } from '@prisma/client';


export interface ExtendedRequest extends Request {
  user: User
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.user) return true;
    throw new UnauthorizedException('Пользователь не авторизован');
  }
}