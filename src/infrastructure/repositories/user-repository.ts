import {
  TypeOrmGenericRepository,
  typeReturn,
} from '../database/typeorm/typeorm-generic-repository';
import { IUserRepository } from 'src/domain/abstracts/repositories/user-repository.abstract';
import User from '../database/typeorm/entities/user.entity';
import { User as UserModel } from 'src/domain/models/user.model';

export class UserRepository
  extends TypeOrmGenericRepository<User>
  implements IUserRepository
{
  async getAllUsers(): Promise<UserModel[]> {
    return await this.getAll();
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await this.repository.findOneBy({ email });
  }

  async saveRefreshToken(
    refreshToken: string,
    email: string,
  ): Promise<UserModel> {
    return await typeReturn<User>(
      this.repository.update(email, {
        refreshToken,
      }),
    );
  }
  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    email: string,
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async removeRefreshToken(email: string): Promise<UserModel> {
    return await typeReturn<User>(
      this.repository.update(email, {
        refreshToken: null,
      }),
    );
  }
}
