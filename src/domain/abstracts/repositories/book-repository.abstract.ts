import { IGenericRepository } from './generic-repository.abstract';
import { Book } from 'src/domain/models/book.model';

export abstract class IBookRepository extends IGenericRepository<Book> {
  abstract doSmth(): void;
}
