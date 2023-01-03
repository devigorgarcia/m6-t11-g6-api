import { Controller, Post, Body, Param, Get } from '@nestjs/common';
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
  async resetPassword() {
    return this.emailService.verifyToken();
  }
}
