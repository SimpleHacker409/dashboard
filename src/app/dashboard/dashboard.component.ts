import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'dashboard';
  sideBarStatus = true;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.auth.getUser());
    console.log(this.auth.isLogedIn());
    if(!this.auth.isLogedIn()){
      this.router.navigate(['/login'])
    }
    console.log("OnInit App");
  }

  sideBarToggler(event) {
    this.sideBarStatus = !this.sideBarStatus;
  }
}
