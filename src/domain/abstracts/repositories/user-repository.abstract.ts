import { User } from 'src/domain/models/user.model';
import { IGenericRepository } from './generic-repository.abstract';
import { UserViewModel } from 'src/domain/viewModels/user.view-model';
import { UserEntity } from 'src/infrastructure/services/database/typeorm/entities/user.entity';

export abstract class IUserRepository extends IGenericRepository<UserEntity> {
  abstract findByEmail(email: string): Promise<UserViewModel>;
  abstract findByEmailIncludePassword(email: string): Promise<User>;
  abstract saveRefreshToken(
    refreshToken: string,
    email: string,
  ): Promise<UserViewModel>;
  abstract removeRefreshToken(email: string): Promise<UserViewModel>;
}
