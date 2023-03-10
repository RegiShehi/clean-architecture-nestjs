import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookUseCases } from 'src/use-cases/book/book.use-case';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private bookUseCases: BookUseCases) {}

  @Get()
  async getAll() {
    return this.bookUseCases.doSmth();
  }
}
