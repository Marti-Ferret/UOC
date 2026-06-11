import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private token: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('auth-token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('auth-token', token);
    }
  }

  getToken(): string | null {
    return this.token;
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  logout() {
    this.token = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth-token');
    }
  }
}
