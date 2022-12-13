import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: any) {
    let token = req.headers.authorization;

    if (!token) {
      throw new HttpException('Missing token', HttpStatus.UNAUTHORIZED);
    }

    token = token.split(' ')[1];

    jwt.verify(
      token,
      process.env.SECRET_KEY,
      (error: jwt.VerifyErrors, decoded: any) => {
        req.user = {
          email: decoded.email,
          id: decoded.id,
          is_admin: decoded.is_admin,
        };
      },
    );
    next();
  }
}
