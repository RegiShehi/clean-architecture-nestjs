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
import { jwtMock } from 'src/utils/mocks/jwt-config.mock';

describe('Authentication use cases', () => {
  let authUseCases: AuthUseCases;
  let dataService: IDataServices;
  let bcrypt: IBcrypt;
  let jwt: IJwt;
  let jwtConfig: IJWTConfig;

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
  const TOKEN_MAX_AGE = 3600;
  const JWT_SECRET = 'jwtsecret';

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
              removeRefreshToken: jest.fn().mockResolvedValue({
                id: 1,
                ...loginUserData,
                refreshToken: null,
              }),
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
          useValue: {
            createToken: jest.fn().mockResolvedValue(REFRESH_TOKEN),
          },
        },
        {
          provide: IJWTConfig,
          useValue: {
            ...jwtMock(TOKEN_MAX_AGE, JWT_SECRET),
          },
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
    jwt = module.get<IJwt>(IJwt);
    jwtConfig = module.get<IJWTConfig>(IJWTConfig);
  });

  it('should be defined', () => {
    expect(authUseCases).toBeDefined();
  });

  describe('When calling register method', () => {
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

    it('should generate cookie with JWT token', async () => {
      const payload = {
        email: 'test@test.com',
      };

      const result = await authUseCases.generateCookieWithJwtToken(payload);

      expect(result).toEqual(
        `Authorization=${REFRESH_TOKEN}; HttpOnly; Path=/; Max-Age=${TOKEN_MAX_AGE}`,
      );
      expect(jwt.createToken).toHaveBeenCalledWith(
        payload,
        JWT_SECRET,
        TOKEN_MAX_AGE,
      );
      expect(jwtConfig.getJWTExpirationTime).toHaveBeenCalled();
      expect(jwtConfig.getJWTSecret).toHaveBeenCalled();
    });

    it('should generate cookie with JWT Refresh token', async () => {
      const payload = {
        email: 'test@test.com',
      };

      const result =
        await authUseCases.generateCookieWithJwtRefreshToken(payload);

      expect(result).toEqual({
        cookieWithRefreshToken: `Refresh=${REFRESH_TOKEN}; HttpOnly; Path=/; Max-Age=${TOKEN_MAX_AGE}`,
        refreshToken: REFRESH_TOKEN,
      });

      expect(jwt.createToken).toHaveBeenCalledWith(
        payload,
        JWT_SECRET,
        TOKEN_MAX_AGE,
      );
      expect(jwtConfig.getJWTRefreshTokenExpirationTime).toHaveBeenCalled();
      expect(jwtConfig.getJWTRefreshTokenSecret).toHaveBeenCalled();
    });
  });

  describe('When calling logout method', () => {
    it('should logout a user and invalidate cookies', async () => {
      const { email } = loginUserData;

      const result = await authUseCases.logout(email);

      expect(dataService.users.removeRefreshToken).toHaveBeenCalledWith(email);

      expect(result).toEqual([
        'Authorization=; HttpOnly; Path=/; Max-Age=0',
        'Refresh=; HttpOnly; Path=/; Max-Age=0',
      ]);
    });
  });
});
