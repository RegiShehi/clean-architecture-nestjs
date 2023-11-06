import { Test, TestingModule } from '@nestjs/testing';
import { BookUseCases } from './book.use-case';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { dataServicesMock } from 'src/utils/mocks/data-services.mock';

describe('BookUseCases', () => {
  let service: BookUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookUseCases,
        {
          provide: IDataServices,
          useValue: dataServicesMock,
        },
      ],
    }).compile();

    service = module.get<BookUseCases>(BookUseCases);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call doSmth method', () => {
    service.doSmth();

    expect(dataServicesMock.books.doSmth).toHaveBeenCalled();
  });
});
