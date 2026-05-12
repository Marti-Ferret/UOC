import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ArticleItem } from '../article-item/article-item';
import { Article, ArticleQuantityChange } from '../article.model';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [NgFor, ArticleItem],
  template: `
    <div>
      <app-article-item
        *ngFor="let article of articles"
        [article]="article"
        (quantityChange)="onQuantityChange($event)">
      </app-article-item>
    </div>
  `,
  styles: [`div { display: flex; gap: 16px; flex-wrap: wrap; }`]
})
export class ArticleList {
  articles: Article[] = [
    { id: 1, name: 'teclat gaming', imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', price: 12, isOnSale: true, quantityInCart: 0 },
    { id: 2, name: 'Cadira ', imageUrl: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', price: 242, isOnSale: true, quantityInCart: 0 },
    { id: 3, name: 'Camara', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1638&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', price: 79.95, isOnSale: false, quantityInCart: 0 }
  ];

  onQuantityChange(change: ArticleQuantityChange) {
    const article = this.articles.find(a => a.id === change.article.id);
    if (article) {
      article.quantityInCart += change.quantity;
    }
  }
}
