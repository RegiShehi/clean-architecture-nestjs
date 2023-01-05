import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { TypeOrmGenericRepository } from '../../../repositories/typeorm-generic.repository';
import { IBookRepository } from 'src/domain/abstracts/repositories/book-repository.abstract';
import { IUserRepository } from 'src/domain/abstracts/repositories/user-repository.abstract';
import { IGenericRepository } from 'src/domain/abstracts/repositories/generic-repository.abstract';
import { AuthorEntity } from './entities/author.entity';
import { BookEntity } from './entities/book.entity';
import { UserEntity } from './entities/user.entity';
import { BookRepository } from 'src/infrastructure/repositories/book.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class TypeOrmDataServices
  implements IDataServices, OnApplicationBootstrap
{
  authors: IGenericRepository<AuthorEntity>;
  books: IBookRepository;
  users: IUserRepository;

  constructor(
    @InjectRepository(AuthorEntity)
    private authorsRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  onApplicationBootstrap() {
    this.authors = new TypeOrmGenericRepository<AuthorEntity>(
      this.authorsRepository,
    );
    this.books = new BookRepository(this.booksRepository);
    this.users = new UserRepository(this.usersRepository);
  }
}
