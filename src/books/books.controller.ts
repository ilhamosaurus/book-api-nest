import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookDto } from './book-dto';
import { GetUser, Public, Roles } from 'src/decorator';
import { User } from '@prisma/client';
import { BooksService } from './books.service';
import { JwtGuard } from 'src/auth/guard';
import { Role } from 'src/auth/dto/dto/enums';

@UseGuards(JwtGuard)
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Public()
  @Post('create')
  create(@GetUser() user: User, @Body() dto: BookDto) {
    return this.bookService.createBooks(user, dto);
  }

  @Patch('edit/:id')
  @Roles(Role.ADMIN)
  editBook(@Param('id', ParseIntPipe) id: number, @Body() dto: BookDto) {
    return this.bookService.editBook(id, dto);
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  deleteBook(@Param('id', ParseIntPipe) bookId: number) {
    return this.bookService.deleteBook(bookId);
  }
}
