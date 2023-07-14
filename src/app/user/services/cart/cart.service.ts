import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseURL: string = "http://localhost:8092";
  private baseCartURL = this.baseURL + "/user/cart";

  private cartBehavior: BehaviorSubject<any>;
  cartObservable: Observable<any>;

  constructor(private http: HttpClient) {
    this.cartBehavior = new BehaviorSubject(true);
    this.cartObservable = this.cartBehavior.asObservable();
  }

  addCart(productId: number): Observable<any> {
    return this.http.post(this.baseCartURL + `/add/${productId}`, null);
  }

  updateCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(this.baseCartURL + `/update/${productId}/${quantity}`, null);
  }

  getCart(): Observable<Response> {
    return this.http.get<Response>(this.baseCartURL)
  }

  setCartUpdated(isUpdated: boolean) {
    this.cartBehavior.next(isUpdated);
  }
}