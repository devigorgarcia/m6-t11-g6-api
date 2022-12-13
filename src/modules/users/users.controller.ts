import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserCreateDTO, UserUpdateDTO } from './users.DTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() data: UserCreateDTO) {
    return this.usersService.create(data);
  }

  @Get(':userId')
  async listUser(@Param('userId') userId: string) {
    return this.usersService.listUser(userId);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() data: UserUpdateDTO,
  ) {
    return this.usersService.updateUser(data, userId);
  }

  @Delete(':userId')
  @HttpCode(204)
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
