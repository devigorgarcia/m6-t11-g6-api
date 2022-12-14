import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [PrismaModule],
})
export class CommentsModule {}
