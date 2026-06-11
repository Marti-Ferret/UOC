import { Routes } from '@angular/router';
import { ArticleList } from './article-list/article-list';
import { ArticleNewReactive } from './article-new-reactive/article-new-reactive';
import { ArticleDetail } from './article-detail/article-detail';
import { authGuard } from '../guards/auth.guard';

export const articleRoutes: Routes = [
  { path: 'list', component: ArticleList },
  { path: 'create', component: ArticleNewReactive, canActivate: [authGuard] },
  { path: ':id', component: ArticleDetail }
];
