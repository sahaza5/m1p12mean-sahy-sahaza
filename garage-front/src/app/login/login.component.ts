import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) {}

  onSubmit() {
    // Basic example: Check for hardcoded credentials (Replace with real authentication)
    if (this.username === 'user' && this.password === 'password') {
      // Successful login
      this.router.navigate(['/home']); // Navigate to home page
    } else {
      // Incorrect credentials
      this.loginError = 'Invalid username or password.';
    }
  }
}
