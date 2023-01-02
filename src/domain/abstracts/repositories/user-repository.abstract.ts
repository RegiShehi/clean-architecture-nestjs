import { User } from 'src/domain/models/user.model';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IUserRepository extends IGenericRepository<User> {
  abstract findByEmail(email: string): Promise<User>;
  abstract saveRefreshToken(refreshToken: string, email: string): Promise<User>;
  abstract getUserIfRefreshTokenMatches(
    refreshToken: string,
    email: string,
  ): Promise<User>;
  abstract removeRefreshToken(email: string): Promise<User>;
}
