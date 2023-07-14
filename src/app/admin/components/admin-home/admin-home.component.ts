import { Component, OnInit } from '@angular/core';
import { PurchaseOrder, Response } from 'src/app/core/models/data.model';
import { AdminOrdersService } from '../../services/order/admin-orders.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  orderList: PurchaseOrder[];
  p: number;

  constructor(private adminOrderService: AdminOrdersService) { }

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders(){
    this.adminOrderService.getOrderList().subscribe((response:Response)=>{
      if (!response.isError) {
        this.orderList = response.response;
      }
    });
  }

}