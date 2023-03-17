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

  constructor(private service : SharedServiceService) {}

  ngOnInit() {
    this.user = this.service.user;
    this.getMenu();
   }

  getMenu() {
   this.menu =  this.service.getMenu()
  }
}
