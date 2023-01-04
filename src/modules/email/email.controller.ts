import {
  Controller,
  Post,
  Body,
  Patch,
  Req,
  Get,
  HttpCode,
} from '@nestjs/common';
import { Request } from 'express';
import { ResetPasswordDTO, SendEmailDTO } from './email.DTO';
import { EmailService } from './email.service';

@Controller('')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-email')
  async sendEmail(@Body() data: SendEmailDTO) {
    return this.emailService.send(data);
  }

  @Get('confirmToken')
  async verifyToken() {
    return this.emailService.verifyToken();
  }

  @Patch('resetPassword')
  @HttpCode(204)
  async resetPassword(@Body() data: ResetPasswordDTO, @Req() request: Request) {
    const { id } = request.user;
    return this.emailService.updatePassword(data, id);
  }
}
