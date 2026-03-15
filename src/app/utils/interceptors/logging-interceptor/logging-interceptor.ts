import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { poopState } from '../../global-signals/global-signals';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const hoo = inject(Location);
  hoo.subscribe((eve) => {
    if (eve.pop) {
      console.log('true');
      poopState.set(true);
    }
  });
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
  );
}
