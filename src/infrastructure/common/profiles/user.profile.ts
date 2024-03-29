import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
// import { RegisterUserDto } from 'src/domain/dtos/user.dto';
import { UserEntity } from 'src/infrastructure/services/database/typeorm/entities/user.entity';
import {
  UserViewModel,
  UserViewModelMinified,
} from 'src/domain/viewModels/user.view-model';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserEntity, UserViewModel);
      createMap(mapper, UserEntity, UserViewModelMinified);
      // createMap(
      //   mapper,
      //   RegisterUserDto,
      //   UserEntity,
      //   forMember((dest) => dest.id, ignore()),
      // );
    };
  }
}
