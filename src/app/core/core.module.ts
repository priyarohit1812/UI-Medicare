import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppMaterialModule } from '../app-material/app-material.module';

import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CoreRoutingModule } from './core-routing.module';
import { InterceptorService } from './services/interceptor.service';


@NgModule({
  declarations: [
   
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AppMaterialModule
  ],
  exports: [
   
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }]
})
export class CoreModule { }
