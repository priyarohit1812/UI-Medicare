import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Cart, Product, ProductCategory, Response } from 'src/app/core/models/data.model';
import { CommonProductService } from 'src/app/core/services/common/product/common-product.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss']
})
export class UserProductComponent implements OnInit {
  product: Product;

  productCategory_list: ProductCategory[] = [];
  cart: Cart;


  image_file: File;
  constructor(private commonProductService: CommonProductService, private activeRoute: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      let productId = param.get('productId');
      if (productId) {
        this.commonProductService.getProduct(productId).subscribe((data: Response) => {
          this.product = data.response;
        });
      }
    });
  }

  addToCart(productId: any) {
    this.cartService.addCart(productId).subscribe((data: Response) => {
      this.cart = data.response
      this.cartService.setCartUpdated(true);
    })
  }
}