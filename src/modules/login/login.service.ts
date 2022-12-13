import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './login.DTO';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new HttpException('Credentials incorrect', HttpStatus.UNAUTHORIZED);
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new HttpException('Credentials incorrect', HttpStatus.UNAUTHORIZED);
    }

    const token = jwt.sign(
      {
        email: user.email,
        is_admin: user.is_admin,
        id: user.id,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '24h',
      },
    );

    return { token: token };
  }
}
