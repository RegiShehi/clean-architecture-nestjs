import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { IBookRepository } from 'src/domain/abstracts/repositories/book-repository.abstract';
import { IUserRepository } from 'src/domain/abstracts/repositories/user-repository.abstract';

const commonRepositoryMethods = {
  getAll: jest.fn(),
  get: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

const bookRepositoryMock: IBookRepository = {
  ...commonRepositoryMethods,
  doSmth: jest.fn(),
};

const userRepositoryMock: IUserRepository = {
  ...commonRepositoryMethods,
  findByEmail: jest.fn(),
  saveRefreshToken: jest.fn(),
  removeRefreshToken: jest.fn(),
};

export const dataServicesMock: IDataServices = {
  authors: { ...commonRepositoryMethods },
  books: bookRepositoryMock,
  users: userRepositoryMock,
};
