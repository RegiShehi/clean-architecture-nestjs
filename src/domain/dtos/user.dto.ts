import { AutoMap } from '@automapper/classes';

export class RegisterUserDto {
  @AutoMap()
  email: string;

  @AutoMap()
  password: string;

  @AutoMap()
  firstName?: string;

  @AutoMap()
  lastName?: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}
