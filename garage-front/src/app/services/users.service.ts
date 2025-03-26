import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

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
    return this.http
      .patch(`${this.apiUrl}/setProfile/${userId}`, userData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Une erreur côté client ou réseau s'est produite.
      console.error("Une erreur s'est produite:", error.error.message);
    } else {
      // Le backend a renvoyé un code de réponse incorrect.
      // Le corps de la réponse peut contenir des indices sur ce qui n'a pas fonctionné.
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
