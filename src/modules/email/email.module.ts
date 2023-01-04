import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [PrismaModule],
})
export class EmailModule {}
