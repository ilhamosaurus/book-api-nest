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
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Public()
  @Post('create')
  @ApiBearerAuth()
  @ApiForbiddenResponse({
    description: 'Page Count tidak boleh lebih kecil dari page read',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Roles' })
  @ApiBody({ type: BookDto })
  @ApiCreatedResponse({ description: 'Buku berhasil ditambahkan' })
  create(@GetUser() user: User, @Body() dto: BookDto) {
    return this.bookService.createBooks(user, dto);
  }

  @Patch('edit/:id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized roles' })
  @ApiCreatedResponse({ description: 'Buku berhasil diperbarui' })
  @ApiNotFoundResponse({ description: 'Buku tidak ditemukan' })
  @ApiForbiddenResponse({
    description: 'Page Count tidak boleh lebih kecil dari page read',
  })
  @ApiBody({ type: BookDto })
  @ApiParam({ type: String, name: 'id' })
  editBook(@Param('id', ParseIntPipe) id: number, @Body() dto: BookDto) {
    return this.bookService.editBook(id, dto);
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiAcceptedResponse({ description: 'Buku berhasil dihapus' })
  @ApiNotFoundResponse({ description: 'Buku tidak ditemukan' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Roles' })
  deleteBook(@Param('id', ParseIntPipe) bookId: number) {
    return this.bookService.deleteBook(bookId);
  }
}
