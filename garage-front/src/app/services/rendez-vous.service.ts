import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RendezVousService {
  private apiUrl = `${environment.apiUrl}/apointments`;

  constructor(private http: HttpClient) {}

  addAppointment(
    userId: string,
    vehiculeId: string,
    appointmentData: any,
    authService: AuthService,
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/bookApointment/${userId}/${vehiculeId}`,
      appointmentData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      },
    );
  }

  // récuperer les rendez-vous du client connécté
  getAppointmentClient(
    userId: string,
    authService: AuthService,
  ): Observable<any> {
    //const token = localStorage.getItem('token')
    const token = authService.getToken();
    console.log('client token', token);
    return this.http.get(`${this.apiUrl}/client/${userId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  updateAppointment(
    appointmentId: string,
    appointmentData: any,
    authService: AuthService,
  ) {
    const token = authService.getToken();
    console.log('token in updateAppointment', token);
    return this.http.patch(
      `${this.apiUrl}/setApointment/${appointmentId}`,
      appointmentData,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
  }

  cancelAppointment(appointmentId: string) {
    return this.http.patch(`${this.apiUrl}/cancelApointment/${appointmentId}`, {
      status: 'CANCELED',
    });
  }

  getAllAppointmentClient(authService: AuthService): Observable<any> {
    const token = authService.getToken();
    console.log("token getallappointmet", token)
    return this.http.get<any[]>(`${this.apiUrl}/admin/`, {
      headers: {
        Authorization: `${token}`,
      }
    });
  }
}
