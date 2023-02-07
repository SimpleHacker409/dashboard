import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'dashboard';
  sideBarStatus = true;

  constructor( ) {}

  ngOnInit() {
    console.log("OnInit App");
  }

  sideBarToggler(event) {
    this.sideBarStatus = !this.sideBarStatus;
  }
}
