import { Component, OnInit } from '@angular/core';
import { Product, Image,Response } from 'src/app/core/models/data.model';
import { AdminProductService } from '../../services/product/admin-product.service';
import { CommonProductService } from 'src/app/core/services/common/product/common-product.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {
  product_list: Product[] = [];
  filteredProduct_list: Product[] = [];
  image_list: Image[]=[]
  is_admin: boolean;
  p: number;
  productName: string;

  constructor(private adminProductService: AdminProductService, private commonProductService: CommonProductService) { }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  fetchAllProducts() {
    this.commonProductService.getAllProducts().subscribe((data: Response) => {
      this.product_list = [...data.response];
      this.filteredProduct_list = this.product_list;
      // 
      
      
    })
  }
 
  deleteProduct(productId: number) {
    this.adminProductService.deleteProduct(productId).subscribe((data) => {
      this.fetchAllProducts();
    });
  }

  SearchProducts() {
    if (this.productName == "") {
      this.fetchAllProducts();
    }
    else {
      console.log(this.productName);
      this.filteredProduct_list = this.product_list.filter(product => {
        return product.productName.toLocaleLowerCase().match(this.productName.toLocaleLowerCase());
      });
    }
  }
}