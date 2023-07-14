import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response, User } from 'src/app/core/models/data.model';
import { UserAuthService } from '../../services/auth/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userForm = this.builder.group({
    email: this.builder.control('', [Validators.required]),
    firstname: this.builder.control('', [Validators.required]),
    lastname: this.builder.control('', [Validators.required]),
    mobile: this.builder.control('', [Validators.minLength(10), Validators.required]),
    password: this.builder.control('')
  });

  updateUserRequest: User = {
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: ""
  };

  constructor(private builder: FormBuilder, private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.userForm.valueChanges.subscribe((reg: any) => {
      this.updateUserRequest.firstName = reg.firstname;
      this.updateUserRequest.lastName = reg.lastname;
      this.updateUserRequest.email = reg.email;
      this.updateUserRequest.mobile = reg.mobile;
      this.updateUserRequest.password = reg.password;
    })
  }

  getUserDetails() {
    this.userAuthService.userGet().subscribe((response: Response) => {
      if (!response.isError) {
        let user = response.response;
        this.updateUserRequest.userId = user.userId;
        this.userForm.patchValue({
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          mobile: user.mobile
        });
      }
    })
  }

  update() {
    if (this.userForm.valid) {
      this.userAuthService.userUpdate(this.updateUserRequest).subscribe((response: Response) => {
      });
    }
  }

  reset(){
    this.getUserDetails();
  }
}