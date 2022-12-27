import { Injectable } from '@nestjs/common';
import { Author } from 'src/domain/models/author.model';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';

@Injectable()
export class AuthorUseCases {
  constructor(private dataServices: IDataServices) {}

  async getAllAuthors(): Promise<Author[]> {
    return await this.dataServices.authors.getAll();
  }

  async getAuthorById(id: string | number): Promise<Author> {
    return await this.dataServices.authors.get(id);
  }
}
