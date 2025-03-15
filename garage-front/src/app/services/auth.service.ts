import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from './login/login.service';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.loginService.isAuthenticated()) {
      console.log('Can activate');
      return this.loginService.verifyToken().pipe(
        map(() => true),
        catchError(() => {
          this.router.navigate(['/login']);
          return [false];
        }),
      );
      // return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

    // this.router.navigate(['/login']);
    // return false;
  }
}
