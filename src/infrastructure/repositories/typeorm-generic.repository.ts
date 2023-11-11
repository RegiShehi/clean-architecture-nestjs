import { IGenericRepository } from 'src/domain/abstracts/repositories/generic-repository.abstract';
import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

//TypeOrm does not return updated object after deleting, inserting or updating
export const typeReturn = async <T>(
  mutation: Promise<UpdateResult | DeleteResult | InsertResult>,
): Promise<T> => {
  return (await mutation).raw[0];
};

export class TypeOrmGenericRepository<T extends { id: number }>
  implements IGenericRepository<T>
{
  constructor(protected repository: Repository<T>) {}

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  public async get(id: number): Promise<T | undefined> {
    return await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async create(item: DeepPartial<T>): Promise<T> {
    return await this.repository.save(item);
  }

  async update(id: number, item: DeepPartial<T>) {
    return await this.repository.update(id, {
      ...item,
    } as QueryDeepPartialEntity<T>);
  }
}
