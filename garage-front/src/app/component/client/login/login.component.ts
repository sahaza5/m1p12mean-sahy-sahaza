import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loginError: string | null = null;

  constructor(private router: Router, private http : HttpClient, private loginService: LoginService) {}

  onSubmit() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.loginService.login(credentials).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful', response);
        // Store token or user data (if necessary)
        localStorage.setItem('token', `Bearer ${response.token}`); // Assuming backend sends a token
        this.router.navigate(['/client-dashboard']); // Navigate to dashboard
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        if (error instanceof Error) {
          this.loginError = error.message; // Use the message from the Error object
        } else if (error.error && error.error.message) {
          this.loginError = error.error.message;
        } else {
          this.loginError = 'Invalid username or password.';
        }
      }
    );
  }
}
