import { AutoMap } from '@automapper/classes';

export class UserViewModel {
  @AutoMap()
  id: number;

  @AutoMap()
  email: string;

  @AutoMap()
  firstName?: string;

  @AutoMap()
  lastName?: string;

  @AutoMap()
  refreshToken?: string;
}
