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
    const token = authService.getToken();

    return this.http.post(
      `${this.apiUrl}/bookApointment/${userId}/${vehiculeId}`,
      appointmentData,
      {
        headers: {
          Authorization: `${token}`,
        },
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
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`,
    );

    return this.http.patch(
      `${this.apiUrl}/cancelApointment/${appointmentId}`,
      {
        status: 'CANCELED',
      },
      { headers },
    );
  }

  getAllAppointmentClient(authService: AuthService): Observable<any> {
    const token = authService.getToken();
    console.log('token getallappointmet', token);
    return this.http.get<any[]>(`${this.apiUrl}/admin/`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  // assignMechanicToAppointment(appointmentId: string, payload: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/appointments/${appointmentId}/assign-mechanic`, payload, {
  //       headers: { Authorization: `Bearer ${this.authService.getToken()}` }
  //   });
  // }

  assignMechanicToAppointment(
    appointmentId: string,
    mechanicId: string,
    authService: AuthService,
  ): Observable<any> {
    const token = authService.getToken();
    console.log('tpken assignMechanicAppointment', token);
    return this.http.patch<any>(
      `${this.apiUrl}/addMechanicienApointment/${appointmentId}`,
      { mechanicien: mechanicId },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
  }
}
