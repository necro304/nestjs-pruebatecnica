import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth-verify')
  @ApiHeader({
    required: true,
    description: 'Bearer token',
    name: 'Authorization',
    example: 'bearer <access_token>',
  })
  getAuth(@Request() req) {
    return req.user;
  }
}
