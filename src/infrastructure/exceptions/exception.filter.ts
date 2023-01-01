import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ILogger } from 'src/domain/abstracts/logger-services.abstract';

interface IError {
  message: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ILogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();

    const error =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as Error).message };

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseData = {
      message: error.message,
      statusCode: status,
      //   path: request.url,
    };

    this.logMessage(request, error, status, exception);

    response.status(status).json(responseData);
  }

  private logMessage(
    request: any,
    error: IError,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        error.message,
        `End Request for ${request.path} | method=${request.method} | status=${status}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        error.message,
        `End Request for ${request.path} | method=${request.method} | status=${status}`,
      );
    }
  }
}
