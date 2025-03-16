import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
//import { globalRole } from './globals-variable';
import { Globals } from './globals-variable';

interface LoginResponse {
  token: string;
  role: string;
  // ... other properties
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/responsable/login/`;
  private _user: any; // Store user data

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}`, credentials)
      .pipe(catchError(this.handleError));
  }

  setUser(user: any): void {
    this._user = user;
    if (user && user.role) {
      Globals.globalRole = user.role; // Modify Globals.globalRole
    }
  }


  getUser(): any {
    return this._user;
  }

  clearUser(): void {
    this._user = null;
    Globals.globalRole = null; // Clear Globals.globalRole
  }

  getToken(): string | null {
    if (this._user && this._user.token) {
      return this._user.token;
    }
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return Globals.globalRole; // Get Globals.globalRole
  }

  private handleError(error: any) {
    console.error('Login Service Error:', error);
    let errorMessage = 'An error occurred. Please try again later.';

    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Error: ${error.status} - ${error.statusText}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    sessionStorage.removeItem('user');
    this.clearUser(); // Clear the user data and the role
    this.router.navigate(['/login']);
  }
}
