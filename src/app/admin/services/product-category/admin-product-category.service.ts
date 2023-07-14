import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProductCategoryService {
  private baseURL: string = "http://localhost:8092";
  private baseProductCategoryURL = this.baseURL + "/admin/productcategory";

  constructor(private http: HttpClient) { }

  saveProductCategory(productCategory: ProductCategory): Observable<any> {
    return this.http.post(this.baseProductCategoryURL + '/save', productCategory);
  }

  deleteProductCategory(productCategoryId: any): Observable<any> {
    return this.http.delete(this.baseProductCategoryURL + `/${productCategoryId}`);
  }
}
