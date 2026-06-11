import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStoreService } from './user-store.service';

export const articleAppInterceptor: HttpInterceptorFn = (req, next) => {
  const userStore = inject(UserStoreService);
  const token = userStore.getToken();

  console.log('INTERCEPTING');

  if (token) {
    console.log('INTERCEPTING, HAS TOKEN');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    console.log('Making an authorized request');
    return next(authReq);
  }

  return next(req);
};
