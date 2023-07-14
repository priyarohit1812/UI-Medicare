import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private baseURL: string = "http://localhost:8092";
  private userLoginURL:string = this.baseURL + "/user/login";
  private userRegisterURL:string = this.baseURL + "/user/register";
  private userGetURL:string = this.baseURL + "/user/get";
  private userUpdateURL:string = this.baseURL + "/user/update";
  
  constructor(private http: HttpClient) { }

  public userLogin(request:any): Observable<Response>{
    return this.http.post<Response>(this.userLoginURL, request);
  }

  public userRegister(request:any): Observable<Response>{
    return this.http.post<Response>(this.userRegisterURL, request);
  }

  public userGet(): Observable<Response>{
    return this.http.get<Response>(this.userGetURL);
  }

  public userUpdate(request:any): Observable<Response>{
    return this.http.put<Response>(this.userUpdateURL, request);
  }
}