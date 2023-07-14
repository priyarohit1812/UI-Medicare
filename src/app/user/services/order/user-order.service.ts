import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseOrderRequest, Response } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {
  private baseURL: string = "http://localhost:8092";
  private baseOrderURL = this.baseURL + "/user/order";

  constructor(private http: HttpClient) { }

  placeOrder(order: PurchaseOrderRequest): Observable<any> {
    return this.http.post(this.baseOrderURL, order);
  }

  getUserOrderList(): Observable<Response> {
    return this.http.get<Response>(this.baseOrderURL + '/list');
  }
}
