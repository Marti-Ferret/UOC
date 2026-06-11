import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { DefaultImagePipe } from '../../pipes/default-image.pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [AsyncPipe, DefaultImagePipe, CurrencyPipe],
  templateUrl: './article-detail.html'
})
export class ArticleDetail implements OnInit {

  article$!: Observable<Article>;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.article$ = this.articleService.getArticle(id);
  }
}
