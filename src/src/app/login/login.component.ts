import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin : boolean;
  logStatus : string;
  isAdmin : boolean;
  loginFormGroup: FormGroup;
  formGroup: FormGroup;

  constructor(
    private auth: AuthService,
    private _formBuilder: FormBuilder
    ) {
      this.loginFormGroup = this._formBuilder.group({
        user: ['', Validators.required],
        password: ['', Validators.required],
        isAdmin: '',
      });
    }

  ngOnInit(): void {}

  onSubmit(loginForm) {
    if(this.loginFormGroup.value.isAdmin) {
      console.log(loginForm);
      this.auth.login({username: loginForm.value.user.toString(), password: loginForm.value.password.toString()})
      .then((res)=>{
        if(res != "Success") {
          this.isLogin = false;
          this.logStatus = res
        }
        console.log(res);
      })
    } else {
      this.auth.managerLogin({email: loginForm.value.user.toString(), pass: loginForm.value.password.toString()})
      .then((res)=>{
        if(res != "Success") {
          this.isLogin = false;
          this.logStatus = res
        }
        console.log(res);
      })
    }
  }
}
