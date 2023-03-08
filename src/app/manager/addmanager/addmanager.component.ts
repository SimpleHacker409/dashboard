import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-addmanager',
  templateUrl: './addmanager.component.html',
  styleUrls: ['./addmanager.component.scss']
})
export class AddmanagerComponent implements OnInit {
  addManager = this._formBuilder.group({
    cname: new FormControl({value:this.service.user.company_name, disabled:true}),
    mname: ['', Validators.required],
    lname:[],
    mail:['', Validators.compose(
      [Validators.required, Validators.email]
      )],
    pass:['', Validators.compose(
      [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/)]
      )],
    status:new FormControl({value:'Manager', disabled:true})
  })
  isWait = false;
  formError: boolean;

    constructor(
      private service: SharedServiceService,
      private _formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any)
      { }

  ngOnInit(): void {
  }

  onSubmit(manager) {
    this.isWait = true;
    let value = manager.value;
    let person =
    {
      "mname":value.mname,
      "lname":value.lname,
      "mail":value.mail,
      "cid":this.service.user.cid,
      "pid":'',
      "token":value.pass,
      "status":'manager'
    }
    console.log(this.addManager);
    if(this.addManager.status != 'INVALID') {
      this.service.addManager(person).then(res => {
        console.log(res);
        this.isWait = false;
        if(res.data.status == 'success') {
          this.addManager.reset();
          this.data.parent.onCloseDialog();
          this.data.parent.getManager();
          this.data.parent.openSnackBar(person.mail, 'Added Successfully')
        }
      })
      this.formError = false;
    } else {
      this.formError = true;
      this.isWait = false;
    }

    console.log(person);
  }

}
