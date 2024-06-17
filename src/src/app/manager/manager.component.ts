import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { SharedServiceService } from '../shared/shared-service.service';
import { AddmanagerComponent } from './addmanager/addmanager.component';
import { SnackbarComponent } from '../shared/widgets/snackbar-component/snackbar-component.component';


export interface PeriodicElement {
  id:number;
  name: string;
  lname: string;
  email: string;
  cid: string;
  pid: string;
  token: string;
  status: string;
}

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  data = new MatTableDataSource<any>()
  durationInSeconds = 5;


  constructor(
    private service: SharedServiceService,
    private dialog:MatDialog,
    private _snackBar: MatSnackBar) {
    this.getManager()
   }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'lname', 'email', 'status', 'id'];
  //dataSource = new MatTableDataSource(this.data);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  async getManager() {
    this.data.data = await this.service.getManagerList()
  }

  addManager() {
    const dialogRef = this.dialog.open(AddmanagerComponent, {
      width: 'fit-content',
      data:{parent: this}
     });
  }

  onCloseDialog() {
    this.dialog.closeAll()
  }

  deleteRider(email) {
    this.service.deleteManager(email).then(res => {
      if(res.data.status = 'success'){
        this.getManager()
        this.openSnackBar(email, 'Deleted Successfully')
      } else {
        this.openSnackBar(email, 'Deleted Failed')
      }
    })
  }

  openSnackBar(title, desc) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        title: title,
        description: desc
      },
      duration: this.durationInSeconds * 1000,
    });
  }

}
