import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-addprice',
  templateUrl: './addprice.component.html',
  styleUrls: ['./addprice.component.scss']
})
export class AddpriceComponent implements OnInit {

  status = ['active','not active']
  error: string;
  state: string;

  priceForm = new FormGroup({
    id: new FormControl(),
    cid: new FormControl(this.service.user.cid),
    name: new FormControl(),
    price: new FormControl('',Validators.pattern(/^(?=.*\d)[0-9]{0,2}(?:\.[0-9]{1,2})?$/)),
    status: new FormControl(this.status[1])
  })
  heading:string = 'Add new price list' ;

  constructor(
    private service: SharedServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any)
    { }

  ngOnInit(): void {
    this.stateCheck()
  }
  stateCheck() {
   if(this.data.state == 'edit') {
    this.state = this.data.state;
    this.heading = 'Update price'
    this.priceForm.setValue(this.data.price)
   }
  }

  onFormSubmit() {
    console.log(this.priceForm);
    if(this.priceForm.status == 'INVALID') {
      this.error = 'not valid'
    } else if(this.data.state == 'add') {
      this.service.addPricelist(this.priceForm.value).then((res) => {
        if(res.data.status == 'success'){
          this.data.parent.closeDialog()
        } else {
          console.log(res);

          this.error = 'Failed update pricelist'
        }
      })
    } else {
      this.service.updatePrice(this.priceForm.value).then((res) => {
        if(res.data.status == 'success'){
          this.data.parent.closeDialog()
        } else {
          this.error = 'Failed update pricelist'
        }
      })
    }
  }
  deletePrice() {
    this.service.deletePrice(this.priceForm.value.id).then((res) => {
      if(res.data.status == 'success'){
        this.data.parent.closeDialog()
      } else {
        this.error = 'Failed update pricelist'
      }
    })
  }

}
