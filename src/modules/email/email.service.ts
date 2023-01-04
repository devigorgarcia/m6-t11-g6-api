import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { sendEmail } from 'src/utils/nodemailer';
import * as jwt from 'jsonwebtoken';

import { ResetPasswordDTO, SendEmailDTO } from './email.DTO';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}

  async send(body: SendEmailDTO) {
    const { to } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email: to,
      },
    });

    if (!user) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }

    const token = jwt.sign(
      {
        email: user.email,
        is_admin: user.is_admin,
        id: user.id,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '10m',
      },
    );

    const text = `
    Olá, <br><br> Segue o token para validação da troca de senha: 
    <br><br>
    <strong>${token}</strong> 
    <br><br>
    Acesse esse
    <a href="http://localhost:5173/confirmToken">link</a> para trocar a senha
    `;

    const subject = 'Reset Password';

    return { token: token };

    // await sendEmail({ subject, text, to });
  }

  async verifyToken() {
    return true;
  }

  async updatePassword(data: ResetPasswordDTO, userId: string) {
    const { password } = data;

    const newHashedPassword = await hash(password, 10);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newHashedPassword,
      },
    });
  }
}
