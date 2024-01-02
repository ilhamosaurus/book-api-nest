import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, regisDto } from './dto/dto';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: regisDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }
}
