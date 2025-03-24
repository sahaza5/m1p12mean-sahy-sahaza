import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/client`);
  }

  // getClientById(id: number) {
  //   return this.http.get(`${this.apiUrl}/clients/${id}`);
  // }
}
