import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IsOwnerCommentMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: any) {
    const id = req.user.id;
    const { commentId } = req.params;
    const comment = await this.prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.BAD_REQUEST);
    }

    if (id !== comment.userId) {
      throw new HttpException(
        'You dont have permission',
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}
