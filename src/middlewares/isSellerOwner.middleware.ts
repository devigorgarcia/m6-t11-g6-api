import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IsSellerOwnerMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: any) {
    const id = req.user.id;
    const { vehicleId } = req.params;

    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      throw new HttpException('Vehicle not found!', HttpStatus.BAD_REQUEST);
    }

    if (id !== vehicle.userId) {
      throw new HttpException(
        'You dont have permission',
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}
