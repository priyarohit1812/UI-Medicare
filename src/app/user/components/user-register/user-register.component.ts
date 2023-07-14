import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response, User } from 'src/app/core/models/data.model';
import { UserAuthService } from '../../services/auth/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  msg: string = "";

  registerForm = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    firstname: this.builder.control('', [Validators.required]),
    lastname: this.builder.control('', [Validators.required]),
    mobile: this.builder.control('', [Validators.minLength(10), Validators.required]),
    password: this.builder.control('', [Validators.required])
  });

  registerRequest: User = {
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: ""
  };

  constructor(private builder: FormBuilder, private userAuthService: UserAuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe((reg: any) => {
      this.registerRequest.firstName = reg.firstname;
      this.registerRequest.lastName = reg.lastname;
      this.registerRequest.email = reg.email;
      this.registerRequest.mobile = reg.mobile;
      this.registerRequest.password = reg.password;
    })
  }

  register() {
    if (this.registerForm.valid) {
      this.userAuthService.userRegister(this.registerRequest).subscribe((response: Response) => {
        let token: string = response.response;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("is_admin", "false");
        this.router.navigateByUrl("user/home");
        this.msg = "User registered successfully";
      })
    } else {
      this.msg = "Invalid Form";
    }
  }
}