import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styles: []
})
export class Navbar {
  @Output() navigate = new EventEmitter<string>();
}
