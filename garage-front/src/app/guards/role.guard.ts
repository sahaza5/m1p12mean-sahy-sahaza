// import { UserType } from './../models/UserType';
// import { Injectable } from "@angular/core";
// import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
// import { AuthService } from "../services/auth.service";
// import { Observable } from 'rxjs/internal/Observable';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environment/environment';
// import { map } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuard implements CanActivate {
//   private apiUrl = `${environment.apiUrl}/users`;

//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private http: HttpClient
//   ) {}

//   canActivate(
//     route: ActivatedRouteSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     const requiredRoles = route.data['roles'] as UserType;

//     //console.log('Header is:', localStorage.getItem('token'));


//     return this.getUserType().pipe(
//       map((user:any) => {
//         if (user.userType === requiredRoles[0]) {
//           return true;
//         } else {
//           this.router.navigate(['/']); // Redirect if unauthorized
//           return false;
//         }
//       })
//     )
//   }

//   getUserType(): Observable<any> {
//     return this.http
//       .get(`${this.apiUrl}/userData`, {
//         headers: {
//           Authorization: `${localStorage.getItem('token')}`,
//         },
//       });
//   }
// }



import { UserType } from './../models/UserType';
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRoles: UserType[] = route.data['roles'];  //  tableau de rôles

    return this.getUserType().pipe(
      map((user: any) => {
        if (requiredRoles.includes(user.userType)) {  // vérification avec `includes`
          return true;
        } else {
          this.router.navigate(['/']); // Redirection si l'utilisateur n'a pas le bon rôle
          return false;
        }
      })
    );
  }

  private getUserType(): Observable<any> {
    return this.http.get(`${this.apiUrl}/userData`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`  // utiliser un service d'auth
      },
    });
  }
}
