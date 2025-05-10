import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    console.log('Header is:', localStorage.getItem('token'));
    return this.http
      .get(`${this.apiUrl}/userData`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  updateUserProfile(userId: string, userData: any): Observable<any> {
    console.log('userdata, userid', userData, userId);
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`,
    );

    return this.http
      .patch(`${this.apiUrl}/setProfile/${userData._id}`, userData, { headers })
      .pipe(catchError(this.handleError));
  }

  getAllMechanics(authService: AuthService): Observable<any> {
    const token = authService.getToken();
    console.log('token in getAllMechanics', token);
    return this.http.get(`${this.apiUrl}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Une erreur côté client ou réseau s'est produite.
      console.error("Une erreur s'est produite:", error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`,
      );
    }
    // Renvoyer un Observable avec un message d'erreur convivial.
    return throwError(
      "Quelque chose s'est mal passé ; veuillez réessayer plus tard.",
    );
  }
}
