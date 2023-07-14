import { Component, OnInit } from '@angular/core';
import { Cart, OrderItem, Response, cartResponse } from 'src/app/core/models/data.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {
  cart: Cart;
  cartResponse: cartResponse;
  orderItemList: OrderItem[];
  isQuantityChange: boolean = false;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(){
    this.cartService.getCart().subscribe((data: Response) => {
      this.cartResponse = data.response;
      this.cart = this.cartResponse.cart;
      this.orderItemList = [...this.cartResponse.orderItems];
    });
  }

  onQuantityChange(productId: number,event:any){
    let value = event.target.value;
    this.updateCart(productId,value);
  }

  updateCart(productId: number, quantity: number) {
    this.cartService.updateCart(productId, quantity).subscribe((data) => {
      this.cart = data.response;
      this.cartService.setCartUpdated(true);
      this.getCartDetails();
    })
  }

  removeProduct(productId: number, quantity:0){
    this.cartService.updateCart(productId, quantity).subscribe((data) => {
      this.cart = data.response;
      this.cartService.setCartUpdated(true);
      this.getCartDetails();
    })
  }
}
