import { IUserRepository } from 'src/domain/abstracts/repositories/user-repository.abstract';
import {
  TypeOrmGenericRepository,
  typeReturn,
} from './typeorm-generic.repository';
import { UserEntity } from '../services/database/typeorm/entities/user.entity';

export class UserRepository
  extends TypeOrmGenericRepository<UserEntity>
  implements IUserRepository
{
  async findByEmail(email: string) {
    return await this.repository.findOneBy({ email });
  }

  async saveRefreshToken(refreshToken: string, email: string) {
    return await typeReturn<UserEntity>(
      this.repository.update(
        { email },
        {
          refreshToken,
        },
      ),
    );
  }

  async removeRefreshToken(email: string) {
    return await typeReturn<UserEntity>(
      this.repository.update(
        { email },
        {
          refreshToken: null,
        },
      ),
    );
  }
}
