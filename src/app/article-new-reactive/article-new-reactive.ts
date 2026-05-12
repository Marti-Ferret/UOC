import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NameArticleValidator } from '../name-article.validator';

@Component({
  selector: 'app-article-new-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './article-new-reactive.html',
})
export class ArticleNewReactive {
  articleForm: FormGroup;
  submitted = false;

  urlPattern = 'https?://[a-zA-Z0-9]+(\\.?[a-zA-Z0-9]+)*\\.[a-zA-Z]{2,3}(/[^\\s]*)?';

  constructor(private fb: FormBuilder) {
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
      console.log('Article creat:', this.articleForm.value);
    }
  }
}
