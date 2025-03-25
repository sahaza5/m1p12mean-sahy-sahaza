import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MecanicienService {

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getAllMecaniciens(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Désactiver un mécanicien (changer son statut)
  desactiverMecanicien(mecanicienId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.patch(`${this.apiUrl}/disable/mechanicien/${mecanicienId}`, {}, { headers });
  }

}
