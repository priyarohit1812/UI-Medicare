import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from './core/services/common/app/app.service';
import { Product, Response } from './core/models/data.model';
import { Router } from '@angular/router';
import { CommonProductService } from './core/services/common/product/common-product.service';
import { CartService } from './user/services/cart/cart.service';
import { UserProductService } from './user/services/product/user-product.service';
import { CommonProductCategoryService } from './core/services/common/product-category/common-product-category.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Medicare';
  showDrawer = true;
  @Input() showSearch: boolean = false;
  @ViewChild('sidenav') sidenav:MatSidenav;

  product_list: Product[] = [];
  searchValue:any = '';
  filteredProduct_list: Product[] = [];
  is_admin: boolean = false;
  token: string | null;
  sessionStorage: Storage | undefined;
  number: any;
  cart_item_count: number = 0;
  category_list: any[] = [];
  brand_list: string[] = [];
  home_path = '';

  filterForm = this.builder.group({
    category: this.builder.control('0'),
    brand: this.builder.control('')
  });

  constructor(private builder: FormBuilder, private appService: AppService, private router: Router, private commonProductService: CommonProductService,
    private userProductService: UserProductService, private cartService: CartService, private commonProductCategoryService: CommonProductCategoryService) {
    this.appService.appObservable.subscribe((data) => {
      if (data) {
        if (data.hasOwnProperty('show_drawer')) {
          this.showDrawer = data.show_drawer;
        }

        if (this.showDrawer) {
          this.executeOnLogin();
        }
      }
    });
  }

  ngOnInit(): void {
    this.executeOnLogin();
    this.filterForm.controls.category.valueChanges.subscribe((categoryId:any)=>{
      this.searchByCategory(categoryId);
    });
    this.filterForm.controls.brand.valueChanges.subscribe((brand:any)=>{
      this.searchByBrand(brand);
    });
  }

  executeOnLogin(){
    this.token = sessionStorage.getItem("token");
    if (this.token) {
      this.is_admin = JSON.parse(sessionStorage.getItem("is_admin") || "false");
      if (!this.is_admin) {
        this.home_path = '/user/home';
        this.cartService.cartObservable.subscribe((isUpdate: boolean) => {
          if (isUpdate) {
            this.cartService.getCart().subscribe((data: Response) => {
              if (!data.isError && data.response) {
                let cartResponse = data.response;
                let cart = cartResponse.cart;
                this.cart_item_count = cart.noOfItems;
              } else {
                this.cart_item_count = 0;
              }
            });
          }
        });
      } else {
        this.home_path = '/admin/home';
      }

      this.fetchAllProductCategories()
      this.fetchAllProducts();
    }
  }

  fetchAllProducts() {
    this.commonProductService.getAllProducts().subscribe((data: Response) => {
      this.product_list = [...data.response];
      this.brand_list = [...new Set(this.product_list.map((p => p.brand)))];
    })
  }

  searchProduct(event: any) {
    let key = event.target.value;
    if (key) {
      this.userProductService.searchProduct(event.target.value).subscribe((data: Response) => {
        if (!data.isError) {
          this.product_list = [...data.response];
          this.userProductService.passProducts(this.product_list);
        }
      });
    } else {
      this.userProductService.passProducts([]);
    }
    return false;
  }

  clearSearch(){
    this.searchValue = "";
    this.userProductService.passProducts([]);
  }

  clearSessionData() {
    this.sidenav.close();
    sessionStorage.clear();
    if (this.is_admin) {
      this.router.navigateByUrl("admin/login");
    } else {
      this.router.navigateByUrl("user/login");
    }
  }

  fetchAllProductCategories() {
    this.commonProductCategoryService.getAllProductCategories().subscribe((data: Response) => {
      let productCategory_list = [...data.response];
      this.category_list = [...new Set(productCategory_list.map((cat => {
        return { id: cat.productcategoryId, label: cat.categoryName };
      })))];
    })
  }

  searchByCategory(catId: number) {
    if (catId > 0) {
      this.userProductService.getProductByCategory(catId).subscribe((data: Response) => {
        if (!data.isError) {
          this.product_list = [...data.response];
          this.userProductService.passProducts(this.product_list);
        }
      });
    } else {
      this.userProductService.passProducts([]);
    }

    return false;
  }

  searchByBrand(brand: string) {
    if (brand) {
      this.userProductService.getProductByBrand(brand).subscribe((data: Response) => {
        if (!data.isError) {
          this.product_list = [...data.response];
          this.userProductService.passProducts(this.product_list);
        }
      });
    } else {
      this.userProductService.passProducts([]);
    }

    return false;
  }
}

