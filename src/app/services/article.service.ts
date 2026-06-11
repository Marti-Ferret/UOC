import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:3000/api/articles';

  constructor(private http: HttpClient) {}

  getArticles(query: string = ''): Observable<Article[]> {
    if (query) {
      return this.http.get<Article[]>(this.apiUrl + '?q=' + query);
    }
    return this.http.get<Article[]>(this.apiUrl);
  }

  changeQuantity(articleID: number, changeInQuantity: number): Observable<any> {
    return this.http.patch(this.apiUrl + '/' + articleID, { changeInQuantity: changeInQuantity });
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.apiUrl + '/' + id);
  }

  create(article: Article): Observable<any> {
    return this.http.post(this.apiUrl, article);
  }
}
