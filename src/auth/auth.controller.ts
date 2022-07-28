import { Controller, HttpCode, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('register')
    async register() {}

    @HttpCode(200)
    @Post('login')
    async login() {}
}
