import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html'
})
export class Register {

  registerForm: FormGroup;
  serverMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.userService.register(username, password).subscribe({
        next: (response) => {
          this.serverMessage = response.msg;
          setTimeout(() => this.router.navigate(['/user/login']), 1500);
        },
        error: (err) => {
          this.serverMessage = err.error.msg;
        }
      });
    }
  }
}
