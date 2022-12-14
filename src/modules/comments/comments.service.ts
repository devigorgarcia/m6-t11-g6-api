import { Injectable, HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCommentDto, userId: string, vehicleId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    const newComments = await this.prisma.comment.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
        vehicle: {
          connect: {
            id: vehicleId,
          },
        },
      },
    });

    return newComments;
  }

  async findVehiclesAll(vehicleId: string) {
    const vehicle = this.prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    const comments = this.prisma.comment.findMany({
      where: {
        vehicleId: vehicleId,
      },
      include: {
        user: true,
      },
    });

    return comments;
  }

  async findOne(commentId: string) {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    return comment;
  }

  async update(commentId: string, data: UpdateCommentDto) {
    return `This action updates a #${commentId} comment`;
  }

  async remove(commentId: string) {
    return `This action removes a #${commentId} comment`;
  }
}
