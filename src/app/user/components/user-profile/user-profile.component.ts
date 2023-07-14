import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isProfile:boolean;
  isAddress:boolean;
  isOrders:boolean;

  screen_arr: string[] = ["PROFILE", "ADDRESS", "ORDER"]

  selectedTabIndex:any;

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      let screen = param.get('screen');
      if (screen) {
        switch(screen){
          case 'PROFILE':
            this.selectedTabIndex = 0;
            break;
          case 'ADDRESS':
            this.selectedTabIndex = 1;
            break;
          case 'ORDER':
            this.selectedTabIndex = 2;
            break;
        }
      } else {
        this.selectedTabIndex = 0;
      }
    });
    
  }

  onTabChanged(event:any){
    this.router.navigateByUrl(`user/profile/${this.screen_arr[event.index]}`);
  }

  showProfile(){
    this.isProfile = true;
    this.isAddress = false;
    this.isOrders = false;
  }

  showAddresses(){
    this.isProfile = false;
    this.isAddress = true;
    this.isOrders = false;
  }

  showOrders(){
    this.isProfile = false;
    this.isAddress = false;
    this.isOrders = true;
  }
}