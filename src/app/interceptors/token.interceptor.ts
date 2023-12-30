import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);

  const token = authService.getToken();
  if (token) {
    req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  const startTime: Date = new Date();
  return next(req).pipe(
    tap((response: HttpResponse<any>): void => {
      console.log((new Date().valueOf() - startTime.valueOf()) / 1000)
    }),
  );
};
