import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getAllClients(): Observable<any> {
    const token = this.authService.getToken();

    return this.http.get<any>(`${this.apiUrl}/users/client`, {
      headers: { Authorization: `${token}` },
    });
  }

  // getClientById(id: number) {
  //   return this.http.get(`${this.apiUrl}/clients/${id}`);
  // }
}
