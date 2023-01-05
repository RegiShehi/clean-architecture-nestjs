import { IUserRepository } from 'src/domain/abstracts/repositories/user-repository.abstract';
import { User } from 'src/domain/models/user.model';
import { UserViewModel } from 'src/domain/viewModels/user.view-model';
import {
  TypeOrmGenericRepository,
  typeReturn,
} from './typeorm-generic.repository';
import { UserEntity } from '../services/database/typeorm/entities/user.entity';

export class UserRepository
  extends TypeOrmGenericRepository<UserEntity>
  implements IUserRepository
{
  async findByEmail(email: string): Promise<UserViewModel> {
    return await this.repository.findOneBy({ email });
  }

  async findByEmailIncludePassword(email: string): Promise<User> {
    return await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async saveRefreshToken(
    refreshToken: string,
    email: string,
  ): Promise<UserViewModel> {
    return await typeReturn<UserViewModel>(
      this.repository.update(
        { email },
        {
          refreshToken,
        },
      ),
    );
  }

  async removeRefreshToken(email: string): Promise<UserViewModel> {
    return await typeReturn<UserViewModel>(
      this.repository.update(
        { email },
        {
          refreshToken: null,
        },
      ),
    );
  }
}
