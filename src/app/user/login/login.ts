import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html'
})
export class Login {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userStore: UserStoreService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.userService.login(username, password).subscribe({
        next: (response) => {
          console.log('Successfully logged in');
          this.userStore.setToken(response.token);
          this.router.navigate(['/article/list']);
        },
        error: () => {
          this.errorMessage = 'Usuari o contrasenya incorrectes';
        }
      });
    }
  }
}
