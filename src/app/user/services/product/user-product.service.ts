import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, Response } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class UserProductService {
  private baseURL: string = "http://localhost:8092";
  private baseProductURL = this.baseURL + "/user/product";
  private productBehavior: BehaviorSubject<Product[]>;
  productObservable: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.productBehavior =new BehaviorSubject<Product[]>([]);
    this.productObservable = this.productBehavior.asObservable();
  }

  getProductByCategory(productCategoryId: any): Observable<Response> {
    return this.http.get<Response>(this.baseProductURL + '/list' + `/${productCategoryId}`);
  }

  getProductByBrand(key: any): Observable<Response> {
    return this.http.get<Response>(this.baseProductURL + '/searchByBrand' + `/${key}`);
  }

  searchProduct(key: any): Observable<Response> {
    return this.http.get<Response>(this.baseProductURL + '/search' + `/${key}`);
  }

  passProducts(Products:Product[]){
    this.productBehavior.next(Products);
  }
}