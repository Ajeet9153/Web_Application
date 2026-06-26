import {
    Controller, Post, Body, HttpCode, HttpStatus, Res,
    Req
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';



@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    async login(@Body() reqBody: LoginDto) {
        return this.authService.login(reqBody)

    }

}





