import { HttpErrorResponse, 
  HttpEvent, 
  HttpHandler, 
  HttpHeaders, 
  HttpInterceptor, 
  HttpRequest, 
  HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest = req.clone();
    if (!clonedRequest.url.includes("login") && !clonedRequest.url.includes("register")) {
      const token = sessionStorage.getItem('token');
      clonedRequest = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      });
      return next.handle(clonedRequest).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == HttpStatusCode.Unauthorized) {
              let errMsg = "Session has expired! Please login again.";
              let is_admin = JSON.parse(sessionStorage.getItem("is_admin") || "false");              
              sessionStorage.setItem("token", "");
              if (!is_admin) {
                this.router.navigateByUrl("user/login");
              } else {
                this.router.navigateByUrl("admin/login");
              }
              alert(errMsg);
            }
          }
          return EMPTY;
        }));
    } else {
      return next.handle(clonedRequest);
    }
  }
}