import { Component, OnInit, Inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { BikeComponent } from './bike/bike.component';

export interface PeriodicElement {
  id: number;
  name: string;
  seriel: string;
  mac_address: string;
  key: string;
  price: string;
  cid: string;
  pid: string;
  discount: string;
  status: string;
  bike_user: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    name: "E-Bike-1",
    seriel: "EVO0324220001",
    mac_address: "a2:45:d6",
    key: "as232",
    price: "15,5",
    cid: "Evolvo",
    pid: "turin",
    discount: "Chrismas 20%",
    status: "reserved",
    bike_user: "maximus.asde@email.com"
  },
  {
    id: 2,
    name: "E-Bike-2",
    seriel: "EVO0324220002",
    mac_address: "a2:45:d6",
    key: "as232",
    price: "15,5",
    cid: "Evolvo",
    pid: "turin",
    discount: "Chrismas 20%",
    status: "maintainance",
    bike_user: ""
  },
  {
    id: 3,
    name: "E-Bike-3",
    seriel: "EVO0324220003",
    mac_address: "a2:45:d6",
    key: "as232",
    price: "15,5",
    cid: "evolvo",
    pid: "soave",
    discount: "chrismas 20%",
    status: "reserved",
    bike_user: "maximus.asde@email.com"
  },
  {
    id: 4,
    name: "E-Bike-4",
    seriel: "EVO0324220004",
    mac_address: "a2:45:d6",
    key: "as232",
    price: "15,5",
    cid: "Evolvo",
    pid: "milan",
    discount: "Chrismas 20%",
    status: "available",
    bike_user: ""
  },
  {
    id: 5,
    name: "E-Bike-5",
    seriel: "EVO0324220005",
    mac_address: "a2:45:d6",
    key: "as232",
    price: "15,5",
    cid: "Evolvo",
    pid: "turin",
    discount: "Chrismas 20%",
    status: "reserved",
    bike_user: "maximus.asde@email.com"
  },
];

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class BikesComponent implements OnInit {

  animal: string;
  name: string;

  constructor(private dialog:MatDialog) {}

  ngOnInit() {}

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'name', 'pid', 'status','bike_user'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null;

  openPopup() {
       const dialogRef = this.dialog.open(BikeComponent, {
        width: 'fit-content',
       });
  }

}

