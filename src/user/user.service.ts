import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async userBook(user) {
    const userEmail = user.email;
    try {
      const books = await this.prisma.book.findMany({
        where: {
          email: userEmail,
        },
      });

      if (!books) {
        return { message: 'you have no book' };
      }

      return books;
    } catch (err) {
      console.log('Error fetching book:', err);
      throw new Error(err);
    }
  }

  allUsers(user) {
    return this.prisma.user.findMany({
      where: {
        NOT: {
          id: user.id,
        },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
      orderBy: {
        firstName: 'asc',
      },
    });
  }

  async editUser(id, dto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          role: dto.role,
        },
      });

      if (!user) {
        throw new ForbiddenException('User tidak ditemukan');
      }

      delete user.hash;
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteUser(id) {
    try {
      const deleteUser = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });

      if (!deleteUser) {
        throw new NotFoundException('User tidak ditemukan');
      }

      return { message: 'User berhasil dihapus' };
    } catch (err) {
      throw new Error(err);
    }
  }
}
