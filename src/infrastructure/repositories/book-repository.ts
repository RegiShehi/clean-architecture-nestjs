import { IBookRepository } from 'src/domain/abstracts/book-repository.abstract';
import Book from '../database/typeorm/entities/book.entity';
import { TypeOrmGenericRepository } from '../database/typeorm/typeorm-generic-repository';

export class BookRepository
  extends TypeOrmGenericRepository<Book>
  implements IBookRepository
{
  doSmth(): void {
    console.log('To do...');
  }
}
