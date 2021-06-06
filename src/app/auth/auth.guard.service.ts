import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
// this class will guard routes when routing to other urls
export class AuthGuardService implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}
  canActivate() {
    const token = <string>localStorage.getItem('jwt');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      alert('Token expired, please login again');
    }
    this.router.navigate(['login']);
    return false;
  }
}
