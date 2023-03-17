import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss']
})
export class BikeComponent implements OnInit {

  companies = [];
  places = [];
  discount = [];
  status = ['active','available', 'maintainance', 'reserved'];

  addBike = new FormGroup({
    id: new FormControl (),
    bike_name: new FormControl ('', Validators.required),
    seriel: new FormControl ({value:'',disabled:true}, Validators.required,),
    mac_address: new FormControl ({value:'',disabled:true}, Validators.required),
    evokey: new FormControl ({value:'',disabled:true}, Validators.required),
    price: new FormControl (),
    cid: new FormControl ({value:'',disabled:true}, Validators.required),
    pid: new FormControl (),
    discount: new FormControl (),
    bike_status: new FormControl (this.status[0]),
    bike_user:  new FormControl ()
  })
  error: string;
  title: string;

  constructor(private service : SharedServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data.type != 'new'){
      this.title = 'Edit Bike'
      this.addBike.setValue(this.data.type)
    } else {
      this.addBike.get('seriel').enable()
      this.addBike.get('mac_address').enable()
      this.addBike.get('evokey').enable()
      this.addBike.get('cid').enable()
      this.title = 'Add New Bike'
    }
    this.loadCompany();
  }
  loadCompany() {
    this.service.getCompanies().then((res) => {
    this.companies = res.data.data
    })
  }

  onAddBikeSubmit() {
      if(this.addBike.status != 'VALID') {
        this.error = this.addBike.status;
      } else {
        this.service.insertBike(this.addBike.value).then((res) => {
          this.handelResponse(res)
        })
      }
    }
  onUpdateBike() {
    console.log(this.addBike.getRawValue());

    this.service.updateBike(this.addBike.getRawValue()).then((res) =>{
      this.handelResponse(res)
    })
  }
  handelResponse(res){
    console.log(res);

    if(res.data.status == 'success') {
      this.error = null;
      this.data.parent.closeDialog();
      this.data.parent.openSnakBar('Bike Updated','Successfull')
    } else {
      this.error = 'failed adding bike';
    }
  }
}
