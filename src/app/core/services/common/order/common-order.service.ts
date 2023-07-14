import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class CommonOrderService {
  private baseURL: string = "http://localhost:8092";
  private baseOrderURL = this.baseURL + "/user/order";
  private baseAdminOrderURL = this.baseURL + "/admin/order";

  constructor(private http: HttpClient) { }

  getOrder(orderId: string, is_admin:boolean): Observable<Response> {
    if (is_admin) {
      return this.http.get<Response>(this.baseAdminOrderURL + `/${orderId}`);
    } else {
      return this.http.get<Response>(this.baseOrderURL + `/${orderId}`);      
    }
  }
}