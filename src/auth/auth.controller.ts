import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, regisDto } from './dto/dto';
import { Public } from 'src/decorator';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: regisDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }
}
