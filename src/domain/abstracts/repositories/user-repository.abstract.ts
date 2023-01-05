import { User } from 'src/domain/models/user.model';
import { IGenericRepository } from './generic-repository.abstract';
import { UserViewModel } from 'src/domain/viewModels/user.view-model';

export abstract class IUserRepository extends IGenericRepository<User> {
  abstract findByEmail(email: string): Promise<UserViewModel>;
  abstract findByEmailIncludePassword(email: string): Promise<User>;
  abstract saveRefreshToken(
    refreshToken: string,
    email: string,
  ): Promise<UserViewModel>;
  abstract removeRefreshToken(email: string): Promise<UserViewModel>;
}
