import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class IsAdminOrOwnerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    const isAdmin = req.user.is_admin;
    const id = req.user.id;
    const { userId } = req.params;
    console.log(isAdmin);
    console.log(id);
    console.log(userId);

    if (!isAdmin && id !== userId) {
      throw new HttpException(
        'You dont have permission',
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}
