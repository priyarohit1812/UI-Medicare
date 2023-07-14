import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class CommonProductCategoryService {
  private baseURL: string = "http://localhost:8092";
  private baseProductCategoryURL = this.baseURL + "/user/productcategory";
  
  constructor(private http: HttpClient) { }

  getAllProductCategories(): Observable<Response> {
    return this.http.get<Response>(this.baseProductCategoryURL + '/list');
  }
}
