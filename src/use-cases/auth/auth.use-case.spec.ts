import { Test, TestingModule } from '@nestjs/testing';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { AuthUseCases } from './auth.use-case';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { IBcrypt } from 'src/domain/abstracts/adapter/bcrypt.abstract';
import { IJwt } from 'src/domain/abstracts/adapter/jwt.abstract';
import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';
import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';
import { LoginUserDto, RegisterUserDto } from 'src/domain/dtos/user.dto';
import { UserProfile } from 'src/infrastructure/common/profiles/user.profile';
import { UserViewModel } from 'src/domain/viewModels/user.view-model';
import { BadRequestException } from '@nestjs/common';

describe('Authentication use cases', () => {
  let authUseCases: AuthUseCases;
  let dataService: IDataServices;
  let bcrypt: IBcrypt;

  const findByEmailMock = jest.fn();
  const bCryptCompareMock = jest.fn();
  const bCryptHashMock = jest.fn();

  const registerUserData: RegisterUserDto = {
    email: 'test@example.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
  };

  const loginUserData: LoginUserDto = {
    email: 'test@example.com',
    password: 'password',
  };

  const REFRESH_TOKEN = 'somerandomstring';
  const HASHED_PASSWORD = 'hashedPassword';
  const HASHED_REFRESH_TOKEN = 'hashedRefreshToken';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        UserProfile,
        AuthUseCases,
        {
          provide: IDataServices,
          useValue: {
            users: {
              findByEmail: findByEmailMock,
              saveRefreshToken: jest.fn().mockResolvedValue({
                id: 1,
                ...loginUserData,
                refreshToken: HASHED_REFRESH_TOKEN,
              }),
              create: jest.fn().mockResolvedValue({
                id: 1,
                ...registerUserData,
                refreshToken: REFRESH_TOKEN,
              }),
            },
          },
        },
        {
          provide: IBcrypt,
          useValue: {
            hash: bCryptHashMock,
            compare: bCryptCompareMock,
          },
        },
        {
          provide: IJwt,
          useValue: {},
        },
        {
          provide: IJWTConfig,
          useValue: {},
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    authUseCases = module.get<AuthUseCases>(AuthUseCases);
    dataService = module.get<IDataServices>(IDataServices);
    bcrypt = module.get<IBcrypt>(IBcrypt);
  });

  it('should be defined', () => {
    expect(authUseCases).toBeDefined();
  });

  describe('When calling register method and email is unique', () => {
    it('should create a new user if email is unique', async () => {
      findByEmailMock.mockResolvedValue(null);
      bCryptHashMock.mockResolvedValue(HASHED_PASSWORD);

      const user = await authUseCases.register(registerUserData);

      expect(bcrypt.hash).toHaveBeenCalledWith(registerUserData.password);
      expect(dataService.users.create).toHaveBeenCalledWith({
        ...registerUserData,
        password: HASHED_PASSWORD,
      });
      expect(user).toBeInstanceOf(UserViewModel);
      expect(user).toEqual({
        id: 1,
        email: registerUserData.email,
        firstName: registerUserData.firstName,
        lastName: registerUserData.lastName,
        refreshToken: REFRESH_TOKEN,
      });
    });

    it('should throw an error if email is not unique', async () => {
      findByEmailMock.mockResolvedValue({
        ...registerUserData,
        id: 1,
        refreshToken: REFRESH_TOKEN,
      });

      await expect(authUseCases.register(registerUserData)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('When calling login method', () => {
    it('should throw an error when user is not found', async () => {
      findByEmailMock.mockResolvedValue(null);

      await expect(authUseCases.login(loginUserData)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error when password is incorrect', async () => {
      findByEmailMock.mockResolvedValue({
        ...loginUserData,
        password: 'simplepassword',
      });

      bCryptCompareMock.mockResolvedValue(false);

      await expect(authUseCases.login(loginUserData)).rejects.toThrowError(
        'Wrong credentials provided',
      );
    });

    it('should return cookies when login is successful', async () => {
      const MOCKED_COOKIE_TOKEN = 'mockedCookieWithToken';
      const MOCKED_COOKIE_REFRESH_TOKEN = 'mockedCookieWithRefreshToken';

      findByEmailMock.mockResolvedValue({
        ...loginUserData,
      });
      bCryptCompareMock.mockResolvedValue(true);
      bCryptHashMock.mockResolvedValue(HASHED_REFRESH_TOKEN);

      authUseCases.generateCookieWithJwtToken = jest
        .fn()
        .mockResolvedValue(MOCKED_COOKIE_TOKEN);

      authUseCases.generateCookieWithJwtRefreshToken = jest
        .fn()
        .mockResolvedValue({
          cookieWithRefreshToken: MOCKED_COOKIE_REFRESH_TOKEN,
          refreshToken: REFRESH_TOKEN,
        });

      const result = await authUseCases.login(loginUserData);

      expect(dataService.users.saveRefreshToken).toHaveBeenCalledWith(
        HASHED_REFRESH_TOKEN,
        loginUserData.email,
      );

      expect(result).toEqual({
        cookieWithJwtToken: MOCKED_COOKIE_TOKEN,
        cookieWithRefreshToken: MOCKED_COOKIE_REFRESH_TOKEN,
      });
    });
  });
});
