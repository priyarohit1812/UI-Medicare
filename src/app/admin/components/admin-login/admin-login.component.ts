import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminAuthService } from '../../services/auth/admin-auth.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/services/common/app/app.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  msg: string = "";
  adminLoginFrom = this.builder.group({
    username: this.builder.control('', [Validators.required, Validators.email]),
    password: this.builder.control('', [Validators.required])
  });

  adminLoginRequest: any = {
    username: "",
    password: ""
  };
  constructor(private builder: FormBuilder, private adminAuthService: AdminAuthService, private appService: AppService, private router: Router) {
    this.appService.setObservableMessage({ 'show_drawer': false });
  }

  ngOnInit(): void {
    this.adminLoginFrom.valueChanges.subscribe((r) => {
      this.adminLoginRequest.username = r.username;
      this.adminLoginRequest.password = r.password;
    });
    let token = sessionStorage.getItem("token");
    let is_admin = JSON.parse(sessionStorage.getItem("is_admin") || "false");
    if (token) {
      this.appService.setObservableMessage({ 'show_drawer': true });
      if (!is_admin) {
        this.router.navigateByUrl("user/home");
      } else {
        this.router.navigateByUrl("admin/home");
      }

    }
  }

  login() {
    if (this.adminLoginFrom.valid) {
      this.adminAuthService.adminLogin(this.adminLoginRequest).subscribe((response) => {
        let token: string = response.response;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("is_admin", "true");
        this.appService.setObservableMessage({ 'show_drawer': true });
        this.router.navigateByUrl("admin/home");
      });
    } else {
      this.msg = "`Invalid credentials";
    }
  }
}