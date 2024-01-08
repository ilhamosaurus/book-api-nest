import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, regisDto } from './dto/dto';
import { Public } from 'src/decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiForbiddenResponse({ description: 'Email sudah terdaftar' })
  register(@Body() dto: regisDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiBadRequestResponse({ description: 'Email tidak terdaftar' })
  @ApiForbiddenResponse({ description: 'Password salah' })
  login(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }
}
