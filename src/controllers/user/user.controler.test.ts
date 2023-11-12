import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserUseCases } from 'src/use-cases/user/user.use-case';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';
import { mockedUsers } from './user.mock';
import request from 'supertest';

describe('UserController', () => {
  let app: INestApplication;
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      controllers: [UserController],
      providers: [
        {
          provide: UserUseCases,
          useValue: {
            getAllUsers: jest.fn().mockResolvedValue(mockedUsers),
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

    app = module.createNestApplication();

    await app.init();

    userController = module.get<UserController>(UserController);
  });

  describe('when calling /users (GET)', () => {
    it('should be defined', () => {
      expect(userController.getAll).toBeDefined();
    });

    it('should return a list of users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect(mockedUsers);
    });
  });
});
