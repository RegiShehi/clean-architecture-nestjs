import { AutoMap } from '@automapper/classes';

export class UserViewModelMinified {
  @AutoMap()
  id: number;

  @AutoMap()
  email: string;

  @AutoMap()
  firstName?: string;

  @AutoMap()
  lastName?: string;
}

export class UserViewModel extends UserViewModelMinified {
  @AutoMap()
  refreshToken?: string;
}
