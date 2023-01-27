import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  constructor() {}
  menu =
  [
    {name:'homepage',icon:'homepage'},
    {name:'bookings',icon:'bookings'},
    {name:'bikes',icon:'bike_scooter'},
    {name:'riders',icon:'sports_motorsports'},
    {name:'pricing',icon:'payment'},
    {name:'places',icon:'home_work'},
    {name:'promotions',icon:'wallet'},
    {name:'reports',icon:'report'},
    {name:'settings',icon:'settings'}
  ];

  ngOnInit(): void {
  }

}
