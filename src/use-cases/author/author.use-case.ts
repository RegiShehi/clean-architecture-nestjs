import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { CreateAuthorDto } from 'src/domain/dtos/author.dto';
import { Author } from 'src/domain/models/author.model';

@Injectable()
export class AuthorUseCases {
  constructor(private dataServices: IDataServices) {}

  async getAllAuthors(): Promise<Author[]> {
    return await this.dataServices.authors.getAll();
  }

  async getAuthorById(id: number): Promise<Author> {
    return await this.dataServices.authors.get(id);
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return await this.dataServices.authors.create(createAuthorDto);
  }
}
