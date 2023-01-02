import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './login.DTO';
import { LoginService } from './login.service';

@Controller('login')
@ApiTags('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() data: LoginDTO) {
    return this.loginService.login(data);
  }
}
