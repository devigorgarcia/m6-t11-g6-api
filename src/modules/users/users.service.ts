import { cpfValidator } from './../../utils/cpfValidator';
import { PrismaService } from './../../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCreateDTO, UserUpdateDTO } from './users.DTO';
import { hash } from 'bcrypt';
import { validate_date } from './../../utils/dateValidator';
import { cepValidator } from './../../utils/cepValidator';
import { phoneValidator } from './../../utils/phoneValidator';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserCreateDTO) {
    const userEmail = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const userCpf = await this.prisma.user.findUnique({
      where: {
        cpf: data.cpf,
      },
    });

    if (userEmail) {
      throw new HttpException('email already exists', HttpStatus.CONFLICT);
    }

    if (userCpf) {
      throw new HttpException('cpf already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await hash(data.password, 10);

    const newDate = new Date(data.birthday);

    cpfValidator(data.cpf);
    phoneValidator(data.fone);
    validate_date(data.birthday);
    cepValidator(data.address.cep);

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        birthday: newDate,
        address: {
          create: data.address,
        },
      },
      select: {
        id: true,
        name: true,
        password: false,
        email: true,
        cpf: true,
        fone: true,
        birthday: true,
        descripiton: true,
        is_admin: false,
        address: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    return newUser;
  }

  async listUsers() {
    const users = this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        password: false,
        email: true,
        cpf: true,
        fone: true,
        birthday: true,
        descripiton: true,
        is_admin: false,
        address: true,
      },
    });

    return users;
  }

  async listUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        vehicle: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = user;

    return response;
  }

  async updateUser(data: UserUpdateDTO, userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.prisma.user.update({
      data,
      where: {
        id: userId,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = updatedUser;

    return response;
  }

  async deleteUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
