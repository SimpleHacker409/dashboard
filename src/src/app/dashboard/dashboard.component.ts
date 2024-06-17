import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { SharedServiceService } from '../shared/shared-service.service';


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
    private router: Router,
    private service: SharedServiceService
  ) {
    if(!this.auth.isLogedIn()){
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {}

  sideBarToggler(event) {
    this.sideBarStatus = !this.sideBarStatus;
  }
}
