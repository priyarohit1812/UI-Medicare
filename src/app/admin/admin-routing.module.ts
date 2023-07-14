import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminProductCategoryListComponent } from './components/admin-product-category-list/admin-product-category-list.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { OrderDetailComponent } from '../core/components/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },

  {
    path: 'admin/home',
    component: AdminHomeComponent
  },
  {
    path: 'admin/product-categories',
    component: AdminProductCategoryListComponent
  },

  {
    path: 'admin/product/:productId',
    component: AdminProductComponent
  },

  {
    path: 'admin/product',
    component: AdminProductComponent
  },

  {
    path: 'admin/products',
    component: AdminProductListComponent
  },
  {
    path: 'admin/order/:orderId',
    component: OrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
