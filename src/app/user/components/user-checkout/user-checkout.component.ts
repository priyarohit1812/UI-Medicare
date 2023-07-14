import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address, PaymentStatus, PaymentType, PurchaseOrderRequest, Response } from 'src/app/core/models/data.model';
import { AddressService } from '../../services/address/address.service';
import { UserOrderService } from '../../services/order/user-order.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.scss']
})
export class UserCheckoutComponent implements OnInit {
  PAYMENT_OPTION_COD = 2;
  PAYMENT_OPTION_CARD = 1;
  addressList: Address[];
  paymentOptionForm: FormGroup;
  checkoutForm: FormGroup;
  addressListForm: FormGroup;
  newAddressForm: FormGroup;
  selectedAddress: Address = {
    addressId: 0,
    address1: '',
    address2: '',
    address3: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  };
  addNewAddress:boolean = false;
  showCardForm:boolean = false;
  selectedPaymentOption: number = this.PAYMENT_OPTION_COD;
  cardNumber:string;

  constructor(private builder: FormBuilder, private router: Router, private addressService: AddressService,
     private userOrderService: UserOrderService, private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchAllAddress();

    this.checkoutForm = this.builder.group({
      cardnumber: this.builder.control("", [Validators.required, Validators.minLength(16)]),
      expiry: this.builder.control("", [Validators.required]),
      cvv: this.builder.control("", [Validators.required]),
      name: this.builder.control("", [Validators.required]),
    });

    this.paymentOptionForm = this.builder.group({
      payment: [this.PAYMENT_OPTION_COD, [Validators.required]]
    });

    this.addressListForm = this.builder.group({
      selAddress: [""]
    });

    this.newAddressForm = this.builder.group({
      add1: this.builder.control("", [Validators.required]),
      add2: this.builder.control(""),
      add3: this.builder.control(""),
      city: this.builder.control("", [Validators.required]),
      state: this.builder.control("", [Validators.required]),
      country: this.builder.control("", [Validators.required]),
      zipCode: this.builder.control("", [Validators.required])
    });

    this.newAddressForm.valueChanges.subscribe((add)=>{
      this.selectedAddress.address1 = add.add1;
      this.selectedAddress.address2 = add.add2;
      this.selectedAddress.address3 = add.add3;
      this.selectedAddress.city = add.city;
      this.selectedAddress.state = add.state;
      this.selectedAddress.country = add.country;
      this.selectedAddress.zipCode = add.zipCode;
    });
    this.paymentOptionForm.valueChanges.subscribe(po=>{
      this.selectedPaymentOption = po.payment;
    });
    this.checkoutForm.controls['cardnumber'].valueChanges.subscribe(cn=>{
      this.cardNumber = cn;
    });
  }

  fetchAllAddress(){
    this.addressService.getAllAddresses().subscribe((response:Response )=>{
      if (!response.isError) {
        this.addressList = response.response;
      }
    });
  }

  addressSelect(event: any, addressId: number) {
    let source = event.source;
    if (source.checked) {
      if (addressId > 0) {
        this.selectedAddress = this.addressList.filter(a=>a.addressId == addressId)[0];
        this.addNewAddress = false;
      } else {
        this.selectedAddress = {
          addressId: 0,
          address1: '',
          address2: '',
          address3: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        };
        this.addNewAddress = true;
      }
    }
  }  

  onCheckOut(){
    if (this.addNewAddress && this.newAddressForm.invalid) {
      return;
    }

    let paymentRemark;
    let paymentType;
    let paymentStatus;
    if (this.selectedPaymentOption == this.PAYMENT_OPTION_COD) {
      paymentStatus = PaymentStatus.Pending;
      paymentType = PaymentType.CashOnDelivery;
      paymentRemark = "Order placed with 'Cash on Delivery (COD)' option."
    } else {
      if (this.checkoutForm.invalid) {
        return;
      }
      paymentStatus = PaymentStatus.Captured;
      paymentType = PaymentType.CreditCard;
      paymentRemark = "Order placed using card ending with " + this.cardNumber.substring(this.cardNumber.length - 4);
    }
    let orderRequest : PurchaseOrderRequest = {
      address: this.selectedAddress,
      payment: {
        paymentId: 0,
        paymentType: paymentType,
        paymentStatus: paymentStatus,
        remark: paymentRemark
      }
    };

    this.userOrderService.placeOrder(orderRequest).subscribe((response:Response)=>{
      if (!response.isError) {
        this.cartService.setCartUpdated(true);
        let orderDetials = response.response;
        this.router.navigateByUrl('user/order', { state: orderDetials});
      }
    })
  }
}