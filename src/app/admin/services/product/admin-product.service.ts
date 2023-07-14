import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  
    private baseURL: string = "http://localhost:8092";
    private baseProductURL = this.baseURL + "/admin/product";
    private baseImageURL = this.baseURL + "/productimages";
  
    constructor(private http: HttpClient) {
    }
  
    saveProduct(product: Product): Observable<any> {
      return this.http.post(this.baseProductURL + '/save', product);
    }
  
    uploadImage(image_Files: File[], productId: number): Observable<any> {
      let formData: FormData = new FormData();
     
      formData.append("productId", productId.toString());
      for (let i = 0; i < image_Files.length; i++) {
        formData.append('file', image_Files[i]);
      }
  
      return this.http.post(this.baseImageURL + '/upload', formData);
    }
  
    deleteProduct(productId: any): Observable<any> {
      return this.http.delete(this.baseProductURL + `/${productId}`);
    }
  
   
  
    deleteImage(productId: number, imageId: number): Observable<any> {
      return this.http.delete(this.baseImageURL + `/${productId}/${imageId}`);
    }
  
  }