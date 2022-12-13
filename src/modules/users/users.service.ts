import { cpfValidator } from './../../utils/cpfValidator';
import { PrismaService } from './../../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCreateDTO, UserUpdateDTO } from './users.DTO';
import { hash } from 'bcrypt';
import { validate_date } from 'src/utils/dateValidator';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserCreateDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new HttpException('email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await hash(data.password, 10);

    const newDate = new Date(data.birthday);

    cpfValidator(data.cpf);
    validate_date(data.birthday);

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        birthday: newDate,
      },
    });

    const { password, ...response } = newUser;

    return response;
  }

  async listUsers() {
    const users = this.prisma.user.findMany();

    return users;
  }

  async listUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
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
