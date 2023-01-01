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
  statusCode: number;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ILogger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();

    const { message, statusCode }: IError =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : {
            message: (exception as Error).message,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          };

    // const status =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logMessage(request, message, statusCode, exception);

    response.status(statusCode).json({ message, statusCode });
  }

  private logMessage(
    request: any,
    message: string,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        message,
        `End Request for ${request.path} | method=${request.method} | status=${status}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        message,
        `End Request for ${request.path} | method=${request.method} | status=${status}`,
      );
    }
  }
}
