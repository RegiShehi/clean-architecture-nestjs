import { IBookRepository } from 'src/domain/abstracts/repositories/book-repository.abstract';
import { TypeOrmGenericRepository } from './typeorm-generic.repository';
import { BookEntity } from '../services/database/typeorm/entities/book.entity';

export class BookRepository
  extends TypeOrmGenericRepository<BookEntity>
  implements IBookRepository
{
  doSmth(): void {
    console.log('To do...');
  }
}
