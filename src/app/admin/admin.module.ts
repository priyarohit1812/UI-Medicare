import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { AdminProductCategoryComponent } from './components/admin-product-category/admin-product-category.component';
import { AdminProductCategoryListComponent } from './components/admin-product-category-list/admin-product-category-list.component';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminLoginComponent,
    AdminProductComponent,
    AdminProductCategoryComponent,
    AdminProductCategoryListComponent,
    AdminProductListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class AdminModule { }
