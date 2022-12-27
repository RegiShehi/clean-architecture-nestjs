import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import Author from './entities/author.entity';
import { TypeOrmGenericRepository } from './typeorm-generic-repository';
import { IBookRepository } from 'src/domain/abstracts/book-repository.abstract';
import { BookRepository } from 'src/infrastructure/repositories/book-repository';
import Book from './entities/book.entity';

@Injectable()
export class TypeOrmDataServices
  implements IDataServices, OnApplicationBootstrap
{
  authors: TypeOrmGenericRepository<Author>;
  books: IBookRepository;

  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  onApplicationBootstrap() {
    this.authors = new TypeOrmGenericRepository<Author>(this.authorsRepository);
    this.books = new BookRepository(this.booksRepository);
  }
}
