import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { sendEmail } from 'src/utils/nodemailer';
import * as jwt from 'jsonwebtoken';

import { SendEmailDTO } from './email.DTO';

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

    // Corpo email: Token = ${Token}
    // e url para inserir o token

    // enviar uma requisição com o token no auth só para validar true e false, ao validar true ele vai para troca de senha e ai faz um patch com o id no token para trocar a senha

    return { token: token };

    // await sendEmail({ subject, text, to });
  }

  async verifyToken() {
    return true;
  }
}
