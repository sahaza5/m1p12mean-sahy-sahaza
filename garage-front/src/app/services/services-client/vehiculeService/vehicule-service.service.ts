import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculeServiceService {

  private apiUrl = `${environment.apiUrl}/users/client/login/`;

  constructor(private http: HttpClient) { }

  // addVehicule( vehicules:any):Observable<any>{
  //   return this.http.post()
  // }
}
