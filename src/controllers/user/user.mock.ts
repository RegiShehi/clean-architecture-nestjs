import { UserEntity } from 'src/infrastructure/services/database/typeorm/entities/user.entity';

export const mockedUser: UserEntity = {
  id: 1,
  email: 'user@email.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'somerandompassword',
  refreshToken: null,
};

export const mockedUsers: UserEntity[] = [
  mockedUser,
  {
    id: 2,
    email: 'user2@email.com',
    firstName: 'John',
    lastName: 'Dale',
    password: 'somerandompassword',
    refreshToken: null,
  },
];
