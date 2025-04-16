import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '../../api-services/login.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    MatButtonModule
  ]
})
export class LoginComponent {
  loginForm: LoginForm = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginForm.username, this.loginForm.password).subscribe({
      next: (res) => {
        if (res) this.router.navigate(['/']);
        else alert('Invalid credentials');
      },
      error: (err) => {
        alert('Invalid credentials');
        console.error(err);
      }
    });
  }
}
