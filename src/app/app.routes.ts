import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.routes').then(m => m.userRoutes)
  },
  {
    path: 'article',
    loadChildren: () => import('./articles/article.routes').then(m => m.articleRoutes)
  }
];
