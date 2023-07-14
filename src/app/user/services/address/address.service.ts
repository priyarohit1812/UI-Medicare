import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, Response } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
    private baseURL: string = "http://localhost:8092";
    private baseaddressURL = this.baseURL + "/user/address";
  
    constructor(private http: HttpClient) { }
  
    saveAddress(address: Address): Observable<any> {
      return this.http.post(this.baseaddressURL + '/save', address);
    }
  
    getAllAddresses(): Observable<Response> {
      return this.http.get<Response>(this.baseaddressURL + '/list');
    }
  
    getAddress(addressId: string): Observable<Response> {
      return this.http.get<Response>(this.baseaddressURL + `/${addressId}`)
    }
  
    deleteAddress(addressId: number): Observable<Response> {
      return this.http.delete<Response>(this.baseaddressURL + `/${addressId}`)
    }
  }
  