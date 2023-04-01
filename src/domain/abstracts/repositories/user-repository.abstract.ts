import { IGenericRepository } from './generic-repository.abstract';
import { UserEntity } from 'src/infrastructure/services/database/typeorm/entities/user.entity';

export abstract class IUserRepository extends IGenericRepository<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity>;
  abstract saveRefreshToken(
    refreshToken: string,
    email: string,
  ): Promise<UserEntity>;
  abstract removeRefreshToken(email: string): Promise<UserEntity>;
}
