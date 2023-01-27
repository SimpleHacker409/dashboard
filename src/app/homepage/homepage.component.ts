import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared/shared-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  dashCard: any;

  constructor(private sharedService: SharedServiceService) { }

  ngOnInit() {
     this.dashCard = this.sharedService.dashCardFunction()
  }

}
