import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductCategory } from 'src/app/core/models/data.model';
import { AdminProductCategoryService } from '../../services/product-category/admin-product-category.service';

@Component({
  selector: 'app-admin-product-category',
  templateUrl: './admin-product-category.component.html',
  styleUrls: ['./admin-product-category.component.scss']
})
export class AdminProductCategoryComponent implements OnInit {
  @Input() productCategory: ProductCategory;
  @Output() deleteProductCategory: any = new EventEmitter();
  productCategoryUpdateForm = this.builder.group({
    categoryName: this.builder.control("", [Validators.required]),

  });
  enableEdit: boolean = false;
  initialValue: string='' ;
  constructor(private builder: FormBuilder, private adminProductCategoryService: AdminProductCategoryService) { }

  ngOnInit(): void {
    this.initialValue = this.productCategory.categoryName;
  }

  editCategory() {
    this.enableEdit = true;
    this.productCategoryUpdateForm.controls.categoryName.patchValue(this.productCategory.categoryName);
    this.productCategoryUpdateForm.valueChanges.subscribe(frm => {
      this.productCategory.categoryName = frm.categoryName ?? this.initialValue;
    });
  }

  deleteCategory() {
    this.deleteProductCategory.emit();
  }

  saveCategory() {
    this.adminProductCategoryService.saveProductCategory(this.productCategory).subscribe((data) => {
      this.initialValue = this.productCategory.categoryName;
      this.enableEdit = false;
    });
  }

  cancelCategory() {
    this.productCategory.categoryName = this.initialValue;
    this.enableEdit = false;
  }
}