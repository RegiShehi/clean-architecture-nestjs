import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILogger } from 'src/domain/abstracts/logger-services.abstract';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: ILogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    this.logger.log(
      `Incoming Request on ${request.path}`,
      `method=${request.method}`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `End Request for ${request.path}`,
          `method=${request.method} duration=${Date.now() - now}ms`,
        );
      }),
    );
  }
}
