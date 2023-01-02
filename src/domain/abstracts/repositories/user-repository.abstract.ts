import { UserModel } from 'src/domain/models/user.model';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IUserRepository extends IGenericRepository<UserModel> {
  abstract findByEmail(email: string): Promise<UserModel>;
  abstract saveRefreshToken(
    refreshToken: string,
    email: string,
  ): Promise<UserModel>;
  abstract getUserIfRefreshTokenMatches(
    refreshToken: string,
    email: string,
  ): Promise<UserModel>;
  abstract removeRefreshToken(email: string): Promise<UserModel>;
}
