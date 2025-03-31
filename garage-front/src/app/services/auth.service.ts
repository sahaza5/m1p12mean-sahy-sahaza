import { UserType } from './../models/UserType';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private apiUrl = 'http://localhost:3000/api/users';
  private apiUrl = `${environment.apiUrl}/users`;
  isAuthenticated = false;
  authSecretKey = 'token';
  _token = ''

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  // Récupérer le token du localStorage
  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Token dans localStorage:', token); // Ajoute ce log pour vérifier
    return token;

    //return localStorage.getItem('token');
  }

  // Décoder le token pour récupérer l'ID utilisateur
  getUserId(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const myToken = token.split(' ');
      const decodedToken: any = jwtDecode(myToken[1]);
      console.log('Token décodé:', decodedToken); // Ajoute ce log pour vérifier
      console.log(decodedToken.id);
      return decodedToken.id || '';
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return '';
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const myToken = token.split(' ');

      const decodedToken: any = jwtDecode(myToken[1]);
      return decodedToken.userType || null; // Assurez-vous que le backend envoie bien le rôle dans le token
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  register(userData: any): Observable<any> {
    console.log('userData', userData);
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    console.log('userData', userData);
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  getUserType(): Observable<any> {
    console.log('Header is:', localStorage.getItem('token'));
    return this.http
      .get(`${this.apiUrl}/userData`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      })
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

  // Déconnexion de l'utilisateur
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['']);
  }
}

// function jwtDecode(token: string): any {
//   throw new Error('Function not implemented.');
// }
