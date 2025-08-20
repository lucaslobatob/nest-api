import { ExecutionContext, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    console.log(`Request... Method: ${method}, URL: ${url}`);

    return next.handle().pipe(
      tap(() => {
        console.log(
          `Response... Method: ${method}, URL: ${url}, Time: ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
