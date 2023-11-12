import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserUseCases } from 'src/use-cases/user/user.use-case';
import request from 'supertest';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      controllers: [UserController],
      providers: [
        UserUseCases,
        {
          provide: IDataServices,
          useValue: {
            users: {
              getAll: jest.fn().mockResolvedValue([]),
            },
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

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });
});
