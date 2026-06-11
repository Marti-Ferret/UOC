import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArticleItem } from '../article-item/article-item';
import { Article, ArticleQuantityChange } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [AsyncPipe, ArticleItem, FormsModule],
  template: `
    <div>
      <input
        type="text"
        placeholder="Cerca articles..."
        [(ngModel)]="searchQuery"
        (ngModelChange)="onSearch($event)">
    </div>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      @for (article of articles$ | async; track article.id) {
        <app-article-item
          [article]="article"
          (quantityChange)="onQuantityChange($event)">
        </app-article-item>
      }
    </div>
  `
})
export class ArticleList {
  articles$: Observable<Article[]>;
  searchQuery: string = '';

  constructor(private articleService: ArticleService) {
    this.articles$ = this.articleService.getArticles();
  }

  onSearch(query: string) {
    this.articles$ = this.articleService.getArticles(query);
  }

  onQuantityChange(change: ArticleQuantityChange) {
    this.articleService.changeQuantity(change.article.id, change.quantity).subscribe(() => {
      this.articles$ = this.articleService.getArticles(this.searchQuery);
    });
  }
}
