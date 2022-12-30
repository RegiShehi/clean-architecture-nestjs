import { IBookRepository } from 'src/domain/abstracts/repositories/book-repository.abstract';
import { TypeOrmGenericRepository } from '../database/typeorm/typeorm-generic-repository';
import Book from '../database/typeorm/entities/book.entity';

export class BookRepository
  extends TypeOrmGenericRepository<Book>
  implements IBookRepository
{
  doSmth(): void {
    console.log('To do...');
  }
}
