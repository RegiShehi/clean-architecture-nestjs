import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';

@Injectable()
export class BookUseCases {
  constructor(private dataServices: IDataServices) {}

  doSmth(): void {
    return this.dataServices.books.doSmth();
  }
}
