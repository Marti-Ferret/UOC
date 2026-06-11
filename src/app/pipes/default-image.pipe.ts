import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage',
  standalone: true
})
export class DefaultImagePipe implements PipeTransform {

  transform(imageUrl: string): string {
    if (imageUrl === '' || imageUrl === null || imageUrl === undefined) {
      return 'assets/images/default.jpg';
    }
    return imageUrl;
  }

}
