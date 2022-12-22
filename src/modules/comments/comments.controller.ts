import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':vehicleId')
  @HttpCode(201)
  create(
    @Body() data: CreateCommentDto,
    @Param('vehicleId') vehicleId: string,
    @Req() request: Request,
  ) {
    const { id } = request.user;
    return this.commentsService.create(data, id, vehicleId);
  }

  @Get(':vehicleId')
  findAll(@Param('vehicleId') vehicleId: string) {
    return this.commentsService.findVehiclesAll(vehicleId);
  }

  @Get(':commentId/comment')
  async findOne(@Param('commentId') commentId: string) {
    return this.commentsService.findOne(commentId);
  }

  @Patch(':commentId/comment')
  update(
    @Param('commentId') commentId: string,
    @Body() data: UpdateCommentDto,
  ) {
    return this.commentsService.update(commentId, data);
  }

  @Delete(':commentId/comment')
  @HttpCode(204)
  remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(commentId);
  }
}
