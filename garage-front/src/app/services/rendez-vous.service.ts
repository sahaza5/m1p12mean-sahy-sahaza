import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  private apiUrl = `${environment.apiUrl}/apointments`

  constructor(private http:HttpClient) { }

  addAppointment(userId: string, vehiculeId: string, appointmentData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/bookApointment/${userId}/${vehiculeId}`, appointmentData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // récuperer les rendez-vous du client connécté
  getAppointmentClient(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${userId}`);

  }

}
