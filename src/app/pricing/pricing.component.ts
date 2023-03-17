import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SharedServiceService } from '../shared/shared-service.service';
import { AddpriceComponent } from './addprice/addprice.component';
import { SnackbarComponent } from '../shared/widgets/snackbar-component/snackbar-component.component';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  durationInSeconds = 5;
  priceList: any;

  constructor(
    private _snackBar: MatSnackBar,
    private service : SharedServiceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPriceList()
  }

  editPrice(pid) {
    console.log(pid);

    const dialogRef = this.dialog.open(AddpriceComponent, {
      data:{
        state: 'edit',
        price: this.priceList.find(({id}) => id == pid),
        parent: this
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

  getPriceList() {
    this.service.getPricelist().then((res) =>{
      this.priceList = res.data.result;
      console.log(this.priceList);
    })
  }
  addPriceList(){
    const dialogRef = this.dialog.open(AddpriceComponent, {
      data:{state: 'add',parent: this}
    })
  }
  closeDialog() {
    this.dialog.closeAll();
    this.getPriceList();
    this.openSnackBar('Update Success', 'Price list updated')
  }
}

