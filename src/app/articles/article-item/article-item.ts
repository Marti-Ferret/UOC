import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgClass, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Article, ArticleQuantityChange } from '../../models/article.model';
import { DefaultImagePipe } from '../../pipes/default-image.pipe';

@Component({
  selector: 'app-article-item',
  standalone: true,
  imports: [NgClass, CurrencyPipe, DefaultImagePipe, RouterLink],
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
