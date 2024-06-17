import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from './shared/shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'dashboard';
  sideBarStatus = true;
  loading: boolean = true;
  constructor(private service : SharedServiceService){}

  ngOnInit(): void {
    this.service.getCurrentUser().then(() =>{
      this.loading = false;
    })
  }

  sideBarToggler(event) {
    this.sideBarStatus = !this.sideBarStatus;
  }
}
