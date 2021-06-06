import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  submit(loginForm: any) {
    let loginmodel = {
      email: loginForm.value.email,
      password: loginForm.value.userpassword,
    };
    this.authService.login(loginmodel);
  }
}
