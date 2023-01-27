import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'dashboard';
  sideBarStatus = true;
  ngOnInit(): void {
    console.log("OnInit App");
  }

  sideBarToggler(event) {
    this.sideBarStatus = !this.sideBarStatus;
  }

}
