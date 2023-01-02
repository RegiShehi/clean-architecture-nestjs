export class RegisterUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}
