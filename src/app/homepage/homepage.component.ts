import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared/shared-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  dashCard: any;
  users: number;

  constructor(private service: SharedServiceService) { }

  ngOnInit() {
     this.dashCard = this.service.dashCardFunction()
     this.service.getWhiteList().then((res)=>{
      this.users = res.length;
      this.dashCard[0].data = this.users;
     })
  }

}
