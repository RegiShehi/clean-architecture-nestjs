import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserUseCases } from 'src/use-cases/user/user.use-case';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userUsecases: UserUseCases) {}

  @Get()
  async getAll() {
    return this.userUsecases.getAllUsers();
  }
}
