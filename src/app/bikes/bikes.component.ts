import { Component, OnInit, Inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { BikeComponent } from './bike/bike.component';
import { SharedServiceService } from '../shared/shared-service.service';
import { SnackbarComponent } from '../shared/widgets/snackbar-component/snackbar-component.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Bike {
  id: number;
  bike_name: string;
  seriel: string;
  mac_address: string;
  evokey: string;
  price: number;
  cid: string;
  pid: string;
  discount: string;
  bike_status: string;
  bike_user: string;
}

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

  ELEMENT_DATA: Bike[]
  durationInSeconds: 5;
  userStatus: string;
  unlockStatus = 'unlock'

  constructor(
    private dialog:MatDialog,
    private service: SharedServiceService,
    private _snakBar: MatSnackBar) {}

  ngOnInit() {
    this.getBikes();
    this.userStatus = this.service.userStatus;
  }

  columnsToDisplay = ['id', 'bike_name', 'pid', 'bike_status','bike_user'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Bike | null;

  getBikes() {
    this.service.getBikes().then((res)=>{
      this.ELEMENT_DATA = res.data.result;
    })
  }

  openPopup(type) {
       const dialogRef = this.dialog.open(BikeComponent, {
        width: 'fit-content',
        data: {parent: this, type: type, userStatus: this.userStatus}
       });
  }

  closeDialog() {
    this.dialog.closeAll()
    this.getBikes()
  }
  deleteBike(id) {
    this.service.removeBike(id).then((res) =>{
      if(res.data.status == 'success') {
        this.openSnakBar('Bike Removed', 'Successfull')
        this.getBikes()
      } else {
        this.openSnakBar('Bike Removed', 'Failed')
      }
    })
  }

  openSnakBar(title, desc){
    this._snakBar.openFromComponent(SnackbarComponent,{
      data: {
        title: title,
        description: desc
      },
      duration: this.durationInSeconds * 1000,
    })
  }

  unlockBike(seriel){
    this.unlockStatus = 'unlocking...'
    this.service.unlockBike(seriel).then((res) =>{
      if(res.status == 200){
        this.unlockStatus = 'unlocked'
      } else {
        this.unlockStatus = 'failed'
      }
    })
  }

}

