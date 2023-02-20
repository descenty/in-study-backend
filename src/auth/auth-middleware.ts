import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { NestMiddleware } from '@nestjs/common/interfaces/middleware/nest-middleware.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';


export interface ExtendedRequest extends Request {
  user: User
}

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) { }

  use(request: any, response: Response, next: () => void) {
    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer === 'Bearer' && token)
        request.user = this.jwtService.verify(token);
    } catch (err) { }
    next()
  }
}