import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ACGuard, AccessControlModule } from 'nest-access-control';
import { Roles_Policy } from './auth/roles-policy';

@Module({
  imports: [
    AccessControlModule.forRoles(Roles_Policy),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    BooksModule,
    PrismaModule,
    AuthModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: ACGuard,
      useFactory: () => ({ getRoles: (req) => req.user.role }),
    },
  ],
})
export class AppModule {}
