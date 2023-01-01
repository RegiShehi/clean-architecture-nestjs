import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CreateAuthorDto } from 'src/domain/dtos/author.dto';
import { AuthorUseCases } from 'src/use-cases/author/author.use-case';
import { JoiValidationPipe } from 'src/infrastructure/pipes/validation.pipe';
import { createAuthorSchema } from './validation/create-author-schema';
import { ILogger } from 'src/domain/abstracts/logger-services.abstract';
import { IException } from 'src/domain/abstracts/exception-services.abstract';

@Controller('api/author')
export class AuthorController {
  constructor(
    private authorUseCases: AuthorUseCases,
    private readonly logger: ILogger,
    private readonly exceptions: IException,
  ) {}

  @Get()
  async getAll() {
    this.logger.error('Logging message');
    throw this.exceptions.internalServerErrorException();

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
