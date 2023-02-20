import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared/shared-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  constructor(private service : SharedServiceService) {}

  menu : any
  user : any

  ngOnInit() {
    this.getUser();
   }

  async getUser() {
    this.user = await this.service.getCurrentUser()
    .finally(()=>{
      this.getMenu()
    })
  }

  getMenu() {
   this.menu =  this.service.getMenu()
  }

}
