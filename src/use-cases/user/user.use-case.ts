import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { UserViewModelMinified } from 'src/domain/viewModels/user.view-model';
import { UserEntity } from 'src/infrastructure/services/database/typeorm/entities/user.entity';

@Injectable()
export class UserUseCases {
  constructor(
    private dataServices: IDataServices,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getAllUsers() {
    return this.mapper.mapArrayAsync(
      await this.dataServices.users.getAll(),
      UserEntity,
      UserViewModelMinified,
    );
  }
}
