import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { ArticleList } from './article-list/article-list';
import { ArticleNewTemplate } from './article-new-template/article-new-template';
import { ArticleNewReactive } from './article-new-reactive/article-new-reactive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, Navbar, ArticleList, ArticleNewTemplate, ArticleNewReactive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentView: string = 'list';

  onNavigate(view: string) {
    this.currentView = view;
  }
}
