import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async createBooks(user, dto) {
    const finished = dto.pageCount === dto.pageRead;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const userEmail = user.email;

    if (dto.pageCount < dto.pageRead) {
      throw new ForbiddenException('page read cannot exceed page count');
    }

    try {
      const book = await this.prisma.book.create({
        data: {
          title: dto.title,
          year: dto.year,
          pageCount: dto.pageCount,
          pageRead: dto.pageRead,
          reading: dto.reading,
          finished: finished,
          insertedAt: insertedAt,
          updatedAt: updatedAt,
          user: {
            connect: {
              email: userEmail,
            },
          },
        },
      });

      return book;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async editBook(id, dto) {
    const book = await this.prisma.book.findFirst({
      where: {
        id: id,
      },
    });

    if (!book) {
      throw new HttpException('Buku tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    const finished = dto.pageCount === dto.pageRead;
    const updatedAt = new Date().toISOString();

    if (dto.pageCount < dto.pageRead) {
      throw new ForbiddenException('page read cannot exceed page count');
    }

    try {
      const updatedBook = await this.prisma.book.update({
        where: {
          id: id,
        },
        data: {
          title: dto.title,
          year: dto.year,
          pageCount: dto.pageCount,
          pageRead: dto.pageRead,
          reading: dto.reading,
          finished: finished,
          updatedAt: updatedAt,
        },
      });

      return updatedBook;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteBook(bookId: number) {
    const book = await this.prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw new HttpException('Buku tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    try {
      this.prisma.book.delete({ where: { id: bookId } });

      return { message: 'Buku berhasil dihapus' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
