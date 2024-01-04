import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async userBook(userEmail) {
    try {
      const books = await this.prisma.book.findMany({
        where: {
          email: userEmail,
        },
      });

      if (!books) {
        return 'you have no book';
      }

      return books;
    } catch (err) {
      console.log('Error fetching book:', err);
      throw new Error(err);
    }
  }
}
