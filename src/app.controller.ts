import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './auth/auth.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('hello')
  getHello(): string {
    return 'Hello World';
  }
}
