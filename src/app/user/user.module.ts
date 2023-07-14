import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { UserAddressListComponent } from './components/user-address-list/user-address-list.component';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { UserCartComponent } from './components/user-cart/user-cart.component';
import { UserCheckoutComponent } from './components/user-checkout/user-checkout.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserOrderListComponent } from './components/user-order-list/user-order-list.component';
import { UserProductComponent } from './components/user-product/user-product.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    UserAddressComponent,
    UserAddressListComponent,
    UserCartComponent,
    UserCheckoutComponent,
    UserDetailsComponent,
    UserLoginComponent,
    UserHomeComponent,
    UserOrderListComponent,
    UserProductComponent,
    UserProfileComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class UserModule { }
