import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Article, ArticleQuantityChange } from '../article.model';

@Component({
  selector: 'app-article-item',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './article-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleItem {
  @Input() article!: Article;
  @Output() quantityChange = new EventEmitter<ArticleQuantityChange>();

  increment() {
    this.quantityChange.emit({ article: this.article, quantity: 1 });
  }

  decrement() {
    if (this.article.quantityInCart > 0) {
        this.quantityChange.emit({ article: this.article, quantity: -1 });
    }
  }
}
