import { Component, OnInit } from '@angular/core';
import { PurchaseOrder, Response } from 'src/app/core/models/data.model';
import { UserOrderService } from '../../services/order/user-order.service';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.scss']
})
export class UserOrderListComponent implements OnInit {
  orderList: PurchaseOrder[];
  p: number;

  constructor(private userOrderService: UserOrderService) { }

  ngOnInit(): void {
    this.fetchAllAddress();
  }

  getDataString(){
    return JSON.stringify(this.orderList);
  }

  fetchAllAddress(){
    this.userOrderService.getUserOrderList().subscribe((response:Response)=>{
      if (!response.isError) {
        this.orderList = response.response;
      }
    });
  }

}