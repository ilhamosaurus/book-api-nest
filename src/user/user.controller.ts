import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/jwt';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('dashboard')
  getUser(@Req() req: Request) {
    return req.user;
  }
}
