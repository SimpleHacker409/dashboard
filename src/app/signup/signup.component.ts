import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/widgets/snackbar-component/snackbar-component.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    pname: ['', Validators.required],
    plname: ['', Validators.required],
    pnumber: ['', Validators.required],
    pmail: ['', Validators.compose(
      [Validators.required, Validators.email]
      )],
  });
  secondFormGroup = this._formBuilder.group({
    cname: ['', Validators.required],
    cdomain: ['',Validators.compose([
        Validators.required,
        Validators.pattern(
          '^(?!.* .*)(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9].)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$'
        ),
      ]),
    ],
    cmail: ['', Validators.compose(
      [Validators.required, Validators.email]
      )],
    iban: ['', Validators.required],
    piva: ['', Validators.required],
    sdi: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    pcode: ['', Validators.required],
  });

  isLinear = true;
  durationInSeconds = 5;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit() {

  }

  onSubmit(FormGroup) {
    this.openSnackBar()
    console.log(FormGroup);
    if (FormGroup.status == 'VALID') {
      this.isLinear = false;
    }
    this.isLinear = true;
  }
  submitForm() {
    console.log(this.firstFormGroup, this.secondFormGroup, this.thirdFormGroup);
    this.openSnackBar()
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        title: this.firstFormGroup.value.pmail,
        description: this.firstFormGroup.value.pname+' Sucessfully created account, Please check your mail to verify'
      },
      duration: this.durationInSeconds * 1000,
    });
  }
}
