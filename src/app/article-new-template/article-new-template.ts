import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-article-new-template',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './article-new-template.html',
})
export class ArticleNewTemplate {
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Article creat:', form.value.article);
    }
  }
}
