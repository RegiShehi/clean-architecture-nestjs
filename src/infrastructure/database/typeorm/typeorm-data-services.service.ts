import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { TypeOrmGenericRepository } from './typeorm-generic-repository';
import { BookRepository } from 'src/infrastructure/repositories/book-repository';
import { IBookRepository } from 'src/domain/abstracts/repositories/book-repository.abstract';
import { UserRepository } from 'src/infrastructure/repositories/user-repository';

import Book from './entities/book.entity';
import Author from './entities/author.entity';
import User from './entities/user.entity';
import { IUserRepository } from 'src/domain/abstracts/repositories/user-repository.abstract';
import { IGenericRepository } from 'src/domain/abstracts/repositories/generic-repository.abstract';

@Injectable()
export class TypeOrmDataServices
  implements IDataServices, OnApplicationBootstrap
{
  authors: IGenericRepository<Author>;
  books: IBookRepository;
  users: IUserRepository;

  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  onApplicationBootstrap() {
    this.authors = new TypeOrmGenericRepository<Author>(this.authorsRepository);
    this.books = new BookRepository(this.booksRepository);
    this.users = new UserRepository(this.usersRepository);
  }
}
