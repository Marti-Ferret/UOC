import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';

export const authGuard: CanActivateFn = () => {
  const userStore = inject(UserStoreService);
  const router = inject(Router);

  console.log('AuthGuard#canActivate called');

  if (userStore.isLoggedIn()) {
    return true;
  }

  console.log('AuthGuard#canActivate not authorized to access page');
  router.navigate(['/user/login']);
  return false;
};
