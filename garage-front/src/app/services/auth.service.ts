import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    console.log("userData", userData)
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  // constructor(
  //   private loginService: LoginService,
  //   private router: Router,
  // ) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
  //   if (this.loginService.isAuthenticated()) {
  //     console.log('Can activate');
  //     return this.loginService.verifyToken().pipe(
  //       map(() => true),
  //       catchError(() => {
  //         this.router.navigate(['/login']);
  //         return [false];
  //       }),
  //     );
  //     // return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }

  //   // this.router.navigate(['/login']);
  //   // return false;
  // }
}
