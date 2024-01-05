import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { Role } from 'src/auth/dto/dto/enums';
import { Roles, Public } from 'src/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('dashboard')
  @Public()
  async userBook(@Req() req: Request) {
    console.log(req.user);
    const userEmail = (req.user as any).email;
    const books = await this.userService.userBook(userEmail);

    return books;
  }

  @Get('all')
  @Roles(Role.ADMIN)
  async getAll(@Req() req: Request) {
    const userRole = (req.user as any).role;
    console.log(userRole);
  }
}
