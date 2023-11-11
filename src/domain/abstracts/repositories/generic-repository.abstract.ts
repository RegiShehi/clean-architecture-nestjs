import { DeepPartial } from 'typeorm';

export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract get(id: number): Promise<T | undefined>;

  abstract create(item: DeepPartial<T>): Promise<T>;

  abstract update(id: number, item: DeepPartial<T>);
}
