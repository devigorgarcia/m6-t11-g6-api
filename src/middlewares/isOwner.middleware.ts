import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class IsOrOwnerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    const id = req.user.id;
    const { userId } = req.params;

    if (id !== userId) {
      throw new HttpException(
        'You dont have permission',
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}
