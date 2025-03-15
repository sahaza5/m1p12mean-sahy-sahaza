import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //private apiUrl = `${environment.apiUrlUsers}/register/client`;
  //private apiUrl = 'http://localhost:3000/api/client/login/'; // Your API base URL
  private apiUrl = `${environment.apiUrl}/users/client/login/`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      // JSON.parse(localStorage.getItem('token') || '{}'),
      localStorage.getItem('token') || '{}',
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // login(credentials: any) {
  //   return (
  //     this.http
  //       .post<any>(`${this.apiUrl}`, credentials)
  //       // .subscribe((response) => {
  //       //   const token = response.token;
  //       //   if (token) {
  //       //     localStorage.setItem('token', token);
  //       //     this.router.navigate(['/client-dashboard']);
  //       //   }
  //       // });
  //       .pipe((response)=>{
  //         if(response && response.token){

  //         }
  //       }),catchError(this.handleError))
  //   );
  // }
  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Store the token in localStorage
          localStorage.setItem('token', `Bearer ${response.token}`);

          // Store the user info (e.g., username, user object) in localStorage
          localStorage.setItem('currentUser', JSON.stringify(response.user)); // Assuming 'response.user' contains the user info

          // You could update your BehaviorSubject if you want to immediately update the current user in the app
          this.currentUserSubject.next(response.user);

          // Navigate to client dashboard
          this.router.navigate(['/client-dashboard']);
        }
      }),
      catchError(this.handleError),
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
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

  logout() {
    localStorage.removeItem('token'); // Example: Remove JWT from localStorage
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
