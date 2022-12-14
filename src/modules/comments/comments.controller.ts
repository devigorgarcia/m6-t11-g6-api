import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':vehicleId')
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

  @Get(':commentId')
  findOne(@Param('commentId') commentId: string) {
    return this.commentsService.findOne(commentId);
  }

  @Patch(':commentId')
  update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(commentId, updateCommentDto);
  }

  @Delete(':commentId')
  remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(commentId);
  }
}
