import {
  TypeOrmGenericRepository,
  typeReturn,
} from '../database/typeorm/typeorm-generic-repository';
import { IUserRepository } from 'src/domain/abstracts/repositories/user-repository.abstract';
import { User } from 'src/domain/models/user.model';
import { UserEntity } from '../database/typeorm/entities/user.entity';

export class UserRepository
  extends TypeOrmGenericRepository<UserEntity>
  implements IUserRepository
{
  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email });
  }

  async saveRefreshToken(refreshToken: string, email: string): Promise<User> {
    return await typeReturn<User>(
      this.repository.update(email, {
        refreshToken,
      }),
    );
  }

  async removeRefreshToken(email: string): Promise<User> {
    return await typeReturn<User>(
      this.repository.update(email, {
        refreshToken: null,
      }),
    );
  }
}
