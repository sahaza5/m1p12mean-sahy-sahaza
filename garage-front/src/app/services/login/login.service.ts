import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';

import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs'; // If you're using 'of' for error handling
import { response } from 'express';

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

  getUsername(): Observable<string | null> {
    return this.currentUserSubject.asObservable();
  }
  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Store the token in localStorage
          localStorage.setItem('token', `Bearer ${response.token}`);

          // You could update your BehaviorSubject if you want to immediately update the current user in the app
          this.currentUserSubject.next(response.user);

          console.log('The response is', response.user);

          // Navigate to client dashboard
          this.router.navigate(['/client-dashboard']);
        }
      }),
      catchError(this.handleError),
    );
  }

  verifyToken(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable((observer) => observer.error('Token not found'));
    }
    console.log('Verify token:', token);
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http
      .get<any>(`${environment.apiUrl}/users/userData`, { headers })
      .pipe(
        tap((response) => {
          console.log('User data received:', response);
          this.currentUserSubject.next(response);
        }),
        catchError((error) => {
          return new Observable((observer) => observer.error('Invalid token'));
        }),
      );
  }

  isAuthenticated(): any {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    console.log('IsAuthenticated token:', token);

    // If no token is found, return false immediately
    if (!token) {
      return false;
    }
    if (this.verifyToken()) {
      console.log('Yes');

      return true;
    }
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
