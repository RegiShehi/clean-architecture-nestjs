import { Author } from '../models/author.model';
import { IBookRepository } from './repositories/book-repository.abstract';
import { IGenericRepository } from './repositories/generic-repository.abstract';

export abstract class IDataServices {
  abstract authors: IGenericRepository<Author>;
  abstract books: IBookRepository;
}
