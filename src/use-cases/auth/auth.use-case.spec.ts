import { Test, TestingModule } from '@nestjs/testing';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { AuthUseCases } from './auth.use-case';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { IBcrypt } from 'src/domain/abstracts/adapter/bcrypt.abstract';
import { IJwt } from 'src/domain/abstracts/adapter/jwt.abstract';
import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';
import { classes } from '@automapper/classes';
import { Mapper, createMapper } from '@automapper/core';
import { RegisterUserDto } from 'src/domain/dtos/user.dto';
import { UserProfile } from 'src/infrastructure/common/profiles/user.profile';
import { dataServicesMock } from 'src/utils/mocks/data-services.mock';
import { UserEntity } from 'src/infrastructure/services/database/typeorm/entities/user.entity';
import { UserViewModel } from 'src/domain/viewModels/user.view-model';
import { BadRequestException } from '@nestjs/common';

describe('Authentication use cases', () => {
  let authUseCases: AuthUseCases;
  let dataService: IDataServices;
  let bcrypt: IBcrypt;
  //   let jwt: IJwt;
  //   let config: IJWTConfig;
  let mapper: Mapper;

  const findByEmailMock = jest.fn();

  const registerUserData: RegisterUserDto = {
    email: 'test@example.com',
    password: 'password',
    firstName: 'Regi',
    lastName: 'Shehi',
  };

  const REFRESH_TOKEN = 'somerandomstring';
  const HASHED_PASSWORD = 'hashedPassword';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        UserProfile,
        AuthUseCases,
        {
          provide: IDataServices,
          useValue: {
            ...dataServicesMock,
            users: {
              findByEmail: findByEmailMock,
              create: jest.fn().mockResolvedValue({
                ...registerUserData,
                id: 1,
                refreshToken: REFRESH_TOKEN,
              }),
            },
          },
        },
        {
          provide: IBcrypt,
          useValue: {
            hash: jest.fn().mockResolvedValue(HASHED_PASSWORD),
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
    // jwt = module.get<IJwt>(IJwt);
    // config = module.get<IJWTConfig>(IJWTConfig);
    mapper = module.get<Mapper>(getMapperToken());
  });

  it('should be defined', () => {
    expect(authUseCases).toBeDefined();
  });

  describe('When calling register method and email is unique', () => {
    it('should create a new user', async () => {
      findByEmailMock.mockResolvedValue(null);

      await authUseCases.register(registerUserData);

      const user = await dataService.users.findByEmail(registerUserData.email);

      const entity = mapper.map(
        { ...registerUserData, password: HASHED_PASSWORD },
        RegisterUserDto,
        UserEntity,
      );

      const createdUser = await dataService.users.create(entity);

      const result = mapper.map(createdUser, UserEntity, UserViewModel);

      expect(dataService.users.findByEmail).toHaveBeenCalledWith(
        registerUserData.email,
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(registerUserData.password);
      expect(user).toBeNull();
      expect(entity).toBeInstanceOf(UserEntity);
      expect(result).toBeInstanceOf(UserViewModel);
      expect(dataService.users.create).toHaveBeenCalledWith({
        ...registerUserData,
        password: HASHED_PASSWORD,
      });
      expect(createdUser).toEqual({
        ...registerUserData,
        id: 1,
        refreshToken: REFRESH_TOKEN,
      });
    });
  });

  describe('When calling register method and email is not unique', () => {
    it('should throw an error', async () => {
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
});
