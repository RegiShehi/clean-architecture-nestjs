import { Author } from '../models/author.model';
import { IBookRepository } from './book-repository.abstract';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract authors: IGenericRepository<Author>;
  abstract books: IBookRepository;
}
