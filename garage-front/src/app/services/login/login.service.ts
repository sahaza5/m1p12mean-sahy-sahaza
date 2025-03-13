import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private apiUrl = `${environment.apiUrlUsers}/register/client`;
  //private apiUrl = 'http://localhost:3000/api/client/login/'; // Your API base URL
  private apiUrl = `${environment.apiUrl}/users/client/login/`;

  constructor(private http: HttpClient, private router : Router) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, credentials)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // You can customize error handling here
    console.error('Login Service Error:', error);
    let errorMessage = 'An error occurred. Please try again later.';

    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Error: ${error.status} - ${error.statusText}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  logout(){
    localStorage.removeItem('token'); // Example: Remove JWT from localStorage
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
