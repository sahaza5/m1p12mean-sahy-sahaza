import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientDashboardService {
  private apiUrl = `${environment.apiUrl}/users/client/login/`;

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null,
  );
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  getClientVehicules(currentUser: any): any {
    const token = localStorage.getItem('token');

    //create headers with Authorization Bearer token
    const headers = new HttpHeaders().set('Authorization', token || '');

    //Send the HTTP GET request with headers
    return this.http.get<any>(
      `${environment.apiUrl}/vehicule/${currentUser.id}`,
      { headers },
    );
  }
}
