import { IGenericRepository } from './generic-repository.abstract';
import { BookModel } from 'src/domain/models/book.model';

export abstract class IBookRepository extends IGenericRepository<BookModel> {
  abstract doSmth(): void;
}
