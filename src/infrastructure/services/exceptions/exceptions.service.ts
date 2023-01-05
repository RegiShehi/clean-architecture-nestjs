import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IException } from 'src/domain/abstracts/exception-services.abstract';

@Injectable()
export class ExceptionsService implements IException {
  notFoundException(message = 'Not found'): void {
    throw new NotFoundException({
      message,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  badRequestException(message = 'Bad request error'): void {
    throw new BadRequestException({
      message,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  internalServerErrorException(message = 'Internal server error'): void {
    throw new InternalServerErrorException({
      message,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  forbiddenException(message = 'Forbidden'): void {
    throw new ForbiddenException({
      message,
      statusCode: HttpStatus.FORBIDDEN,
    });
  }

  unauthorizedException(message = 'Unauthorized'): void {
    throw new UnauthorizedException({
      message,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
