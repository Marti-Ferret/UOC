import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NameArticleValidator } from '../../validators/name-article.validator';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-new-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './article-new-reactive.html',
})
export class ArticleNewReactive {
  articleForm: FormGroup;
  submitted = false;

  urlPattern = 'https?://[a-zA-Z0-9]+(\\.?[a-zA-Z0-9]+)*\\.[a-zA-Z]{2,3}(/[^\\s]*)?';

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.fb.group({
      name: ['', [Validators.required, NameArticleValidator]],
      price: [null, [Validators.required, Validators.min(0.1)]],
      imageUrl: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      isOnSale: [false]
    });
  }

  get name() { return this.articleForm.get('name'); }
  get price() { return this.articleForm.get('price'); }
  get imageUrl() { return this.articleForm.get('imageUrl'); }

  onSubmit() {
    this.submitted = true;
    if (this.articleForm.valid) {
      const newArticle: Article = {
        id: 0,
        name: this.articleForm.value.name,
        price: this.articleForm.value.price,
        imageUrl: this.articleForm.value.imageUrl,
        isOnSale: this.articleForm.value.isOnSale,
        quantityInCart: 0
      };
      this.articleService.create(newArticle).subscribe(() => {
        this.articleForm.reset({ isOnSale: false });
        this.submitted = false;
      });
    }
  }
}
