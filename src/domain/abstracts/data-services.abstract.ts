import { AuthorModel } from '../models/author.model';
import { IBookRepository } from './repositories/book-repository.abstract';
import { IGenericRepository } from './repositories/generic-repository.abstract';
import { IUserRepository } from './repositories/user-repository.abstract';

export abstract class IDataServices {
  abstract authors: IGenericRepository<AuthorModel>;
  abstract books: IBookRepository;
  abstract users: IUserRepository;
}
