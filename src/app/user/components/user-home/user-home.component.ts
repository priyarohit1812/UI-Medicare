import { Component, OnInit } from '@angular/core';
import { Product, Response } from 'src/app/core/models/data.model';
import { CommonProductService } from 'src/app/core/services/common/product/common-product.service';
import { UserProductService } from '../../services/product/user-product.service';
import { CommonProductCategoryService } from 'src/app/core/services/common/product-category/common-product-category.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  product_list: Product[] = [];
  category_list: any[] = [];
  brand_list: string[] = [];
  i: number = 0;
  constructor(private commonProductService: CommonProductService, private userProductService: UserProductService, private commonProductCategoryService: CommonProductCategoryService) { }

  ngOnInit(): void {
    this.userProductService.productObservable.subscribe((products: Product[]) => {
      if (products && products.length > 0) {
        this.product_list = [...products];
      } else {
        this.fetchAllProducts();
      }
    });
    this.fetchAllProducts();
  }

  fetchAllProducts() {
    this.commonProductService.getAllProducts().subscribe((data: Response) => {
      this.product_list = [...data.response];
      this.brand_list = [...new Set(this.product_list.map((p => p.brand)))];
    })
  }
}