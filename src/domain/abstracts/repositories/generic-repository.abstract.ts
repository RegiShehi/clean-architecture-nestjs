export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract get(id: string | number): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string | number, item: T);
}
