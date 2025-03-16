import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../services/services-admin-mechanic/login.service';
import { Globals } from '../../../services/services-admin-mechanic/globals-variable';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username = '';
  password = '';
  loginError: string | null = null;

  constructor(private router: Router, private loginService: LoginService, private http: HttpClient) {}

  onSubmit() {
    const credentials = {
      username: this.username,
      password: this.password,
    };

    this.loginService.login(credentials).subscribe(
      (response) => {
        console.log('Full Response (Angular):', response);
        this.loginService.setUser(response);
        console.log('Global Role:', Globals.globalRole);

        localStorage.setItem('token', `Bearer ${response.token}`);
        localStorage.setItem('role', response.role)

        if (Globals.globalRole === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (Globals.globalRole === 'mechanic') {
          this.router.navigate(['/mechanic-dashboard']);
        } else {
          console.error('Unexpected role:', Globals.globalRole);
          this.loginError = 'Unauthorized access.';
        }
      },
      (error) => {
        console.error('Login failed', error);
        if (error.error && error.error.message) {
          this.loginError = error.error.message;
        } else if (error.error) {
          this.loginError = 'Login failed.';
        } else {
          this.loginError = 'Invalid username or password.';
        }
      }
    );
  }
}
