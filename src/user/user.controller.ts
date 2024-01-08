import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { Role } from 'src/auth/dto/dto/enums';
import { Roles, Public, GetUser } from 'src/decorator';
import { User } from '@prisma/client';
import { editDto } from './user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('dashboard')
  @Public()
  @ApiBearerAuth()
  async userBook(@GetUser() user: User) {
    return await this.userService.userBook(user);
  }

  @Get('all')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized Roles' })
  allUsers(@GetUser() user: User) {
    return this.userService.allUsers(user);
  }

  @Patch('edit/:id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized Roles' })
  @ApiBody({ type: editDto })
  @ApiParam({ type: Number, name: 'id' })
  async editUser(@Param('id', ParseIntPipe) id: number, @Body() dto: editDto) {
    return await this.userService.editUser(id, dto);
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized Roles' })
  @ApiParam({ type: Number, name: 'id' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
