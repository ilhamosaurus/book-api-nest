import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ACGuard, UseRoles } from 'nest-access-control';
import { Role } from 'src/auth/dto/dto/enums';
import { JwtGuard } from 'src/auth/jwt';
import { Roles_Policy } from 'src/auth/roles-policy';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('dashboard')
  @UseRoles({
    resource: 'userBook',
    action: 'read',
    possession: 'own',
  })
  async userBook(@Req() req: Request) {
    console.log(req.user);
    const userEmail = (req.user as any).email;
    const books = await this.userService.userBook(userEmail);

    return books;
  }
  @UseRoles({
    resource: 'allBook',
    action: 'read',
    possession: 'any',
  })
  async getAll(@Req() req: Request) {
    const userRole = (req.user as any).role;
    console.log(userRole);
  }
}
