import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class CommonProductService {
  private baseURL: string = "http://localhost:8092";
  private baseProductURL = this.baseURL + "/user/product";
  private baseImageURL= this.baseURL + "/admin/product";
  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Response> {
    return this.http.get<Response>(this.baseProductURL + '/list');
  }
  
  getProduct(productId: any): Observable<Response> {
    return this.http.get<Response>(this.baseProductURL + `/${productId}`);
  }

  getProductImages(productId:any):Observable<Response> {
    return this.http.get<Response>(this.baseImageURL + `/${productId}/images`);
  }
}
