import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //private apiUrl = 'http://localhost:3000/api/users';
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  // Récupérer le token du localStorage
  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log("Token dans localStorage:", token);  // Ajoute ce log pour vérifier
    return token;

    //return localStorage.getItem('token');
  }

  // Décoder le token pour récupérer l'ID utilisateur
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      console.log("Token décodé:", decodedToken);  // Ajoute ce log pour vérifier
      console.log(decodedToken.id)
      return decodedToken.id || null;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role || null; // Assurez-vous que le backend envoie bien le rôle dans le token
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }


  register(userData: any): Observable<any> {
    console.log("userData", userData)
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    console.log("userData", userData)
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  // Déconnexion de l'utilisateur
  // logout() {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login']);
  // }
}

// function jwtDecode(token: string): any {
//   throw new Error('Function not implemented.');
// }
