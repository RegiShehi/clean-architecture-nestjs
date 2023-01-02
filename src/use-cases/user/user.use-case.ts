import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/domain/abstracts/data-services.abstract';
import { User } from 'src/domain/models/user.model';

@Injectable()
export class UserUseCases {
  constructor(private dataServices: IDataServices) {}

  async getAllUsers(): Promise<User[]> {
    return await this.dataServices.users.getAll();
  }
}
