import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Address, Response } from 'src/app/core/models/data.model';
import { AddressService } from '../../services/address/address.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {
  addressForm: FormGroup;
  @Input() address: Address = {
    addressId: 0,
    address1: '',
    address2: '',
    address3: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    saveAddress: true
  };
  constructor(private activeRoute: ActivatedRoute, private builder: FormBuilder, private addressService: AddressService, private router: Router) { }

  ngOnInit(): void {
    this.addressForm = this.builder.group({
      add1: this.builder.control("", [Validators.required]),
      add2: this.builder.control(""),
      add3: this.builder.control(""),
      city: this.builder.control("", [Validators.required]),
      state: this.builder.control("", [Validators.required]),
      country: this.builder.control("", [Validators.required]),
      zipCode: this.builder.control("", [Validators.required]),
      isNewAdd: this.builder.control(true),
    });

    this.addressForm.valueChanges.subscribe((add: any) => {
      this.address.address1 = add.add1;
      this.address.address2 = add.add2;
      this.address.address3 = add.add3;
      this.address.city = add.city;
      this.address.state = add.state;
      this.address.country = add.country;
      this.address.zipCode = add.zipCode;
      this.address.saveAddress = add.isNewAdd;
    });

    this.getAddress();
  }

  getAddress() {
    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      let addressId = param.get('addressId');
      if (addressId) {
        this.addressService.getAddress(addressId).subscribe((data: Response) => {
          this.address = data.response;
          this.addressForm.patchValue({
            add1: this.address.address1,
            add2: this.address.address2,
            add3: this.address.address3,
            city: this.address.city,
            state: this.address.state,
            country: this.address.country,
            zipCode: this.address.zipCode
          })
        });
      }
    });
  }

  saveAddress() {
    this.addressService.saveAddress(this.address).subscribe((data: Response) => {
      this.router.navigateByUrl("user/profile/ADDRESS");
    });
  }

  
}