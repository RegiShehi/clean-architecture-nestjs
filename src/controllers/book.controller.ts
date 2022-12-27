import { Controller, Get } from '@nestjs/common';
import { BookUseCases } from 'src/use-cases/book/book.use-case';

@Controller('api/book')
export class BookController {
  constructor(private bookUseCases: BookUseCases) {}

  @Get()
  async getAll() {
    return this.bookUseCases.doSmth();
  }
}
