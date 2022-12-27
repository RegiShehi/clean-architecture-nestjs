import { IGenericRepository } from 'src/domain/abstracts/generic-repository.abstract';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class TypeOrmGenericRepository<T extends { id: number }>
  implements IGenericRepository<T>
{
  constructor(private repository: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async get(id: number): Promise<T> {
    return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async create(item: T): Promise<T> {
    return await this.repository.save(item);
  }

  async update(id: number, item: T) {
    return await this.repository.update(id, {
      ...item,
    } as QueryDeepPartialEntity<T>);
  }
}
