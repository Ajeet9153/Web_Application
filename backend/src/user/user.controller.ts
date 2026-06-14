import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body() body: any,
  ) {
    return this.userService.register({
      name: body.name,
      email: body.email,
      password: body.password,
    });
  }

  @Post('login')
  async login(
    @Body() body: any,
  ) {
    return this.userService.login({
      email: body.email,
      password: body.password,
    });
  }
}