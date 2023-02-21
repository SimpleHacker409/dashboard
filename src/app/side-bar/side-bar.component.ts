import { Component, OnInit } from '@angular/core';
import { SharedServiceService, User } from '../shared/shared-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  menu : any
  user : User
  logo: any;

  constructor(private service : SharedServiceService) {}

  ngOnInit() {
    this.getUser();
   }

  getUser() {
    this.service.getCurrentUser()
    .then((res)=>{
      this.user = res;
      this.logo = res.logo;
      this.getMenu()
    })
  }

  getMenu() {
   this.menu =  this.service.getMenu()
  }

}
