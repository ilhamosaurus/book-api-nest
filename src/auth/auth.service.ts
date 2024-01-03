import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { loginDto, regisDto } from './dto/dto';
import * as argon from 'argon2';
import { Role } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async register(dto: regisDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    /* // set the role
    if (!dto.role || (dto.role !== 'USER' && dto.role !== 'ADMIN')) {
      dto.role = 'USER';
    } */
    // save the new user in the database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          role: dto.role as Role,
        },
      });
      // return the saved user
      delete user.hash;
      return this.signToken(user.firstName, user.email, user.role);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email sudah terdaftar');
        }
      }

      throw error;
    }
  }

  async login(dto: loginDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user is not found
    if (!user) {
      throw new ForbiddenException('Email tidak terdaftar');
    }
    // compare password
    const isMatch = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!isMatch) {
      throw new ForbiddenException('Password salah');
    }
    // send back user
    delete user.hash;
    return this.signToken(user.firstName, user.email, user.role);
  }

  async signToken(
    name: string,
    email: string,
    role: string,
  ): Promise<{ token: string }> {
    const payload = {
      firstName: name,
      email,
      role,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return { token };
  }
}
