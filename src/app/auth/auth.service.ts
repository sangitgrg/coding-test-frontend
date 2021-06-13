import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
// this service will handle tasks related with authentication and authorization
// after login json web token is store in local storage
export class AuthService {
  api_url = environment.api_url;
  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private route: Router
  ) {}

  login(login_model: any) {
    this.http
      .post(`${this.api_url}/auth/login`, JSON.stringify(login_model), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe(
        (res) => {
          const tk = (<any>res).token;
          localStorage.setItem('jwt', (<any>res).token);
          const role = this.jwtHelper.decodeToken(tk).Role;
          localStorage.setItem('userId', this.jwtHelper.decodeToken(tk).ID);
          this.route.navigate(['review']);
        },
        (err) => {
          alert(err.error.title);
        }
      );
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
