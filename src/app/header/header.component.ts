import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  decodedToken = '';
  userFullName = '';
  isAdmin = false;
  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private route: Router
  ) {
    console.log('Header Initialised');
  }

  ngOnInit(): void {
    this.decodedToken = <any>localStorage.getItem('jwt');
    if (this.decodedToken) {
      const name = this.jwtHelper.decodeToken(this.decodedToken).Name;
      this.userFullName = name;
      const role = this.jwtHelper.decodeToken(this.decodedToken).Role;
      this.isAdmin = role === 'Admin';
    }
  }

  getUserFullName() {}

  onLogOutClick() {
    this.authService.logout();
  }

  onUserClick() {
    this.route.navigate(['users']);
  }

  onReviewClick() {
    this.route.navigate(['review']);
  }

  viewUserAssignedToMe() {
    this.route.navigate(['userassigned']);
  }
}
