import { Component, OnInit } from '@angular/core';
import { OrderItem, PurchaseOrderResponse, Response } from '../../models/data.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonOrderService } from '../../services/common/order/common-order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderDetails: PurchaseOrderResponse;
  orderItemList: OrderItem[];
  isNewOrder:boolean = false;
  is_admin: boolean = false;
  
  constructor(private activeRoute: ActivatedRoute, private commonOrderService: CommonOrderService) { }

  ngOnInit(): void {
    this.is_admin = JSON.parse(sessionStorage.getItem("is_admin") || "false");
    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      let orderId = param.get('orderId');
      if (orderId) {
        this.commonOrderService.getOrder(orderId, this.is_admin).subscribe((response:Response)=>{
          if(!response.isError){
            this.orderDetails = response.response;
            this.isNewOrder = false;            
          }
        });
      } else {
        this.orderDetails = history.state;
        this.isNewOrder = true;
      }
    });
  }

}