import { AbstractControl, ValidationErrors } from '@angular/forms';

export function NameArticleValidator(control: AbstractControl): ValidationErrors | null {
  const nomsProhibits = [
    'Prova',
    'Test',
    'Mock',
    'Fake'
  ];
  const valor = control.value?.trim();
  if (nomsProhibits.includes(valor)) {
    return { forbiddenName: { valor } };
  }
  return null;
}
