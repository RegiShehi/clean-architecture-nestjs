import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CreateAuthorDto } from 'src/domain/dtos/author.dto';
import { AuthorUseCases } from 'src/use-cases/author/author.use-case';
import { createAuthorSchema } from './validation/create-author-schema';
import { ApiTags } from '@nestjs/swagger';
import { IException } from 'src/domain/abstracts/exception-services.abstract';
import { JoiValidationPipe } from 'src/infrastructure/common/pipes/validation.pipe';

@ApiTags('authors')
@Controller('authors')
export class AuthorController {
  constructor(
    private authorUseCases: AuthorUseCases,
    private readonly exceptions: IException,
  ) {}

  @Get()
  async getAll() {
    return this.authorUseCases.getAllAuthors();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.authorUseCases.getAuthorById(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createAuthorSchema))
  createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorUseCases.createAuthor(createAuthorDto);
  }

  // @Put(':id')
  // updateAuthor(
  //   @Param('id') authorId: string,
  //   @Body() updateAuthorDto: UpdateAuthorDto,
  // ) {
  //   return this.authorUseCases.updateAuthor(authorId, updateAuthorDto);
  // }
}
