import { Component, OnInit } from '@angular/core';
import { Address, Response } from 'src/app/core/models/data.model';
import { AddressService } from '../../services/address/address.service';

@Component({
  selector: 'app-user-address-list',
  templateUrl: './user-address-list.component.html',
  styleUrls: ['./user-address-list.component.scss']
})
export class UserAddressListComponent implements OnInit {
  addressList: Address[];
  filtered_addressList: Address[];
  is_admin: boolean;
  p: number;
  addressKey: string;

  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
    this.fetchAllAddress();
  }

  fetchAllAddress(){
    this.addressService.getAllAddresses().subscribe((response:Response)=>{
      if (!response.isError) {
        this.addressList = response.response;
        this.filtered_addressList = this.addressList;
      }
    });
  }

  deleteAddress(addressId: number) {
    this.addressService.deleteAddress(addressId).subscribe((data) => {
      this.fetchAllAddress();
    });
  }

  SearchAddress() {
    if (this.addressKey == "") {
      this.fetchAllAddress();
    }
    else {
      console.log(this.addressKey);
      this.filtered_addressList = this.addressList.filter(address => {
        return address.address1.toLocaleLowerCase().match(this.addressKey.toLocaleLowerCase()) || 
        address.address2.toLocaleLowerCase().match(this.addressKey.toLocaleLowerCase()) || 
        address.address3.toLocaleLowerCase().match(this.addressKey.toLocaleLowerCase()) ||
        address.city.toLocaleLowerCase().match(this.addressKey.toLocaleLowerCase()) ||
        address.state.toLocaleLowerCase().match(this.addressKey.toLocaleLowerCase());
      });
    }
  }
}