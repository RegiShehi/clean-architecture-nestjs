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

  // @Get(':id')
  // async getById(@Param('id') id: number) {
  //   return this.authorUseCases.getAuthorById(id);
  // }

  // @Post()
  // @UsePipes(new JoiValidationPipe(createAuthorSchema))
  // createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
  //   return this.authorUseCases.createAuthor(createAuthorDto);
  // }

  // @Put(':id')
  // updateAuthor(
  //   @Param('id') authorId: string,
  //   @Body() updateAuthorDto: UpdateAuthorDto,
  // ) {
  //   return this.authorUseCases.updateAuthor(authorId, updateAuthorDto);
  // }
}
