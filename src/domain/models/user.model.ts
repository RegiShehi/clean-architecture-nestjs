export class UserModel {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  refreshToken?: string;
}
