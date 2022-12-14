import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    const { is_admin } = req.user;
    if (is_admin) {
      next();
    } else {
      throw new HttpException(
        'You dont have autorhization',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
