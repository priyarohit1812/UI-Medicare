import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductCategory, Response } from 'src/app/core/models/data.model';
import { AdminProductService } from '../../services/product/admin-product.service';
import { CommonProductService } from 'src/app/core/services/common/product/common-product.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommonProductCategoryService } from 'src/app/core/services/common/product-category/common-product-category.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  product: Product = {
    productId: 0,
    productCode: "",
    productName: "",
    brand: "",
    mfgDate: "",
    expDate: "",
    seller: "",
    discription: "",
    price: 0,
    images:[],
    productCategory: {
      productcategoryId: 0,
      categoryName: "",
      products: []
    }
  };

  productCategory_list: ProductCategory[] = [];

  productForm: FormGroup;

  image_files: File[];
  image_file: unknown[];


  constructor(private adminProductService: AdminProductService, private commonProductService: CommonProductService, 
    private commonProductCategoryService: CommonProductCategoryService, private builder: FormBuilder,
    private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.commonProductCategoryService.getAllProductCategories().subscribe((data: Response) => {
      this.productCategory_list = [...data.response];
    });

    this.productForm = this.builder.group({
      code: this.builder.control("", [Validators.required]),
      category: this.builder.control("", [Validators.required]),
      name: this.builder.control("",[Validators.required]) ,
      brand: this.builder.control("", [Validators.required]),
      mfgDate: this.builder.control("", [Validators.required]),
      expDate: this.builder.control("", [Validators.required]),
      seller: this.builder.control("", [Validators.required]),
      discription: this.builder.control("", [Validators.required]),
      price: this.builder.control("", [Validators.required]),
      images: this.builder.control([]),
    });

    this.productForm.valueChanges.subscribe((data) => {
      this.product.productCode = data.code;
      this.product.productCategory = this.productCategory_list.filter(fcl => fcl.productcategoryId == data.category)[0];
      this.product.productName = data.name;
      this.product.brand = data.brand;
      this.product.mfgDate = data.mfgDate;
      this.product.expDate = data.expDate;
      this.product.seller = data.seller;
      this.product.discription = data.discription;
      this.product.price = data.price;
    });

    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      let productId = param.get('productId');
      if (productId) {
        this.commonProductService.getProduct(productId).subscribe((data: Response) => {
          this.loadProduct(data.response);
        });
      }
    });
  }

  loadProduct(data: Product) {
    this.product = data;
    this.productForm.patchValue({
      code: data.productCode,
      category: data.productCategory.productcategoryId,
      name: data.productName,
      brand: data.brand,
      mfgDate: data.mfgDate,
      expDate: data.expDate,
      seller: data.seller,
      discription: data.discription,
      price: data.price
    });
  }

  onImageChange(event: any) {
    
    this.image_files = event.target.files;
    this.image_file = Array.from(this.image_files);
  }

  saveItem() {
    this.adminProductService.saveProduct(this.product).subscribe((data: Response) => {
      if (!data.isError) {
        let savedProduct: Product = data.response;
        if (savedProduct && savedProduct.productId > 0) {
          if (this.image_files) {
            this.adminProductService.uploadImage(this.image_files, savedProduct.productId).subscribe((data) => {
              this.router.navigateByUrl("admin/products");
            });
          }
        }
      }
    });
  }

  deleteImage(productId: number, imgIndex:number){
    let imageId = this.product.images?.at(imgIndex)?.imageId;
    if (imageId) {
      this.adminProductService.deleteImage(productId, imageId).subscribe((data) => {
        if (!data.isError) {
          this.product.images?.splice(imgIndex,1);
        }
      });
    }
  }
}