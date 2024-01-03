import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { name: string; email: string; role: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      // we can make this or delete user.hash;
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
      },
    });
    return user;
  }
}
