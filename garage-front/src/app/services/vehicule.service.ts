import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HtmlParser } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private apiUrl = `${environment.apiUrl}/vehicule`

  constructor(private http:HttpClient ) {}

  addVehicule(userId: string, userData:any): Observable<any>{
    console.log('userData service',userData);
    return this.http.post(`${this.apiUrl}/register/${userId}`, userData);
  }

  getVehicule(userId: string, vehiculeData:any): Observable<any>{

    return this.http.get(`${this.apiUrl}/${userId}`, vehiculeData)

  }

  updateVehicule(vehiculeId: string, vehiculeData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${vehiculeId}`, vehiculeData)
  }

}
