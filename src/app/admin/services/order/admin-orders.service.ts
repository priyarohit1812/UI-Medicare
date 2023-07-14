import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  private baseURL: string = "http://localhost:8092";
  private baseOrderURL = this.baseURL + "/admin/order";

  constructor(private http: HttpClient) { }

  getOrderList(): Observable<Response> {
    return this.http.get<Response>(this.baseOrderURL + '/list');
  }
}

