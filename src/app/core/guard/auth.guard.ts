import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.authService.isLoggedIn) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    }
    return true;
  }
}
