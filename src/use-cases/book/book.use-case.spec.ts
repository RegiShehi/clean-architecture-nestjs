import { Test, TestingModule } from '@nestjs/testing';
import { BookUseCases } from './book.use-case';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { dataServicesMock } from 'src/utils/mocks/data-services.mock';

describe('BookUseCases', () => {
  let bookUseCase: BookUseCases;

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

    bookUseCase = module.get<BookUseCases>(BookUseCases);
  });

  it('should be defined', () => {
    expect(bookUseCase).toBeDefined();
  });

  it('should call doSmth method', () => {
    bookUseCase.doSmth();

    expect(dataServicesMock.books.doSmth).toHaveBeenCalled();
  });
});
