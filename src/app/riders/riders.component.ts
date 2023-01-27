import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  email: string;
  user_status: string;
  user_id: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
  {name: 'giovanni carena', email: 'giovanni@email.com', user_status: 'active', user_id: 'U1'},
  {name: 'marco mayrhofer', email: 'marco@email.com', user_status: 'to activate', user_id: 'U1'},
  {name: 'lucia lindger', email: 'lucia@email.com', user_status: 'hold', user_id: 'U1'},
  {name: 'isabella bernard', email: 'isabella@email.com', user_status: 'active', user_id: 'U1'},
  {name: 'angelo elst', email: 'angelo@email.com', user_status: 'active', user_id: 'U1'},
  {name: 'alessandra carena', email: 'alessandra@email.com', user_status: 'active', user_id: 'U1'},
  {name: 'federico katrin', email: 'federico@email.com', user_status: 'active', user_id: 'U1'},
  {name: 'martina kaif', email: 'martina@email.com', user_status: 'active', user_id: 'U1'},
  {name: 'roberto pandey', email: 'roberto@email.com', user_status: 'to activate', user_id: 'U1'},
  {name: 'raffaele dravid', email: 'raffaele@email.com', user_status: 'hold', user_id: 'U1'},
];

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],

})
export class RidersComponent implements OnInit {
  selected : any;
  isSelectChanged : any;
  data = [
    {name: 'giovanni carena', email: 'giovanni@email.com', user_status: 'active', user_id: 'U1'},
    {name: 'marco mayrhofer', email: 'marco@email.com', user_status: 'to activate', user_id: 'U2'},
    {name: 'lucia lindger', email: 'lucia@email.com', user_status: 'hold', user_id: 'U3'},
    {name: 'isabella bernard', email: 'isabella@email.com', user_status: 'active', user_id: 'U4'},
    {name: 'angelo elst', email: 'angelo@email.com', user_status: 'active', user_id: 'U1'},
    {name: 'alessandra carena', email: 'alessandra@email.com', user_status: 'active', user_id: 'U1'},
    {name: 'federico katrin', email: 'federico@email.com', user_status: 'active', user_id: 'U1'},
    {name: 'martina kaif', email: 'martina@email.com', user_status: 'active', user_id: 'U1'},
    {name: 'roberto pandey', email: 'roberto@email.com', user_status: 'to activate', user_id: 'U1'},
    {name: 'raffaele dravid', email: 'raffaele@email.com', user_status: 'hold', user_id: 'U1'},
  ];

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['name', 'email', 'user_status', 'user_id'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectCar(event_data, data) {
    console.log(data + "changed to" + event_data);

    this.isSelectChanged = true;
  }

}
