import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductCategory, Response } from 'src/app/core/models/data.model';
import { AdminProductCategoryService } from '../../services/product-category/admin-product-category.service';
import { CommonProductCategoryService } from 'src/app/core/services/common/product-category/common-product-category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-product-category-list',
  templateUrl: './admin-product-category-list.component.html',
  styleUrls: ['./admin-product-category-list.component.scss']
})
export class AdminProductCategoryListComponent implements OnInit {
  msg: string = "";
  p: number=0;
  productCategory_list: ProductCategory[] = [];
  filteredProductCategory_list: ProductCategory[] = [];
  categoryName: string="";

  productCategoryForm = this.builder.group({
    categoryName: this.builder.control("", [Validators.required]),

  });

  productCategory: ProductCategory = {
    productcategoryId: 0,
    categoryName: "",
    products: []
  };
  config: any;


  constructor(private builder: FormBuilder, private adminProductCategoryService: AdminProductCategoryService, private commonProductCategoryService: CommonProductCategoryService) { }

  ngOnInit(): void {
    this.productCategoryForm.valueChanges.subscribe((add: any) => {
      this.productCategory.categoryName = add.categoryName;
    })

    this.fetchAllProductCategories();

  }

  fetchAllProductCategories() {
    this.commonProductCategoryService.getAllProductCategories().subscribe((data: Response) => {
      this.productCategory_list = [...data.response]
      this.filteredProductCategory_list = this.productCategory_list;
    })
  }

  saveCategory() {
    this.adminProductCategoryService.saveProductCategory(this.productCategory).subscribe((data) => {
      this.fetchAllProductCategories();
    
    });
  }

  deleteCategory(id: number) {
    this.adminProductCategoryService.deleteProductCategory(id).subscribe((data) => {
      this.fetchAllProductCategories();
    })
  }

  SearchCategory() {
    if (this.categoryName == "") {
      this.fetchAllProductCategories();
    }
    else {
      console.log(this.categoryName);
      this.filteredProductCategory_list = this.productCategory_list.filter(category => {
        return category.categoryName.toLocaleLowerCase().match(this.categoryName);
      });
    }
  }
}