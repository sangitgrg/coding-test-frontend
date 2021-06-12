import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('jwt')) {
      this.router.navigate(['review']);
    }
  }

  submit(loginForm: any) {
    let loginmodel = {
      email: loginForm.value.email,
      password: loginForm.value.userpassword,
    };
    this.authService.login(loginmodel);
  }
}
