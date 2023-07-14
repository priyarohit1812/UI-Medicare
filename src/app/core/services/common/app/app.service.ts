import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private appBehavior: BehaviorSubject<any>;
  appObservable: Observable<any>;
  constructor() {
    this.appBehavior = new BehaviorSubject<any>(null);
    this.appObservable = this.appBehavior.asObservable();
   }

   setObservableMessage(msg: any){
    this.appBehavior.next(msg);
   }
}
