import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup = this._formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required],

  });

  isLogin : boolean;
  logStatus : string;

  constructor(
    private auth: AuthService,
    private _formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {

  }

  onSubmit(loginForm) {
    console.log(loginForm);
    this.auth.login({username: loginForm.value.user.toString(), password: loginForm.value.password.toString()})
    .then((res)=>{
      if(res != "Success") {
        this.isLogin = false;
        this.logStatus = res
      }
      console.log(res);
    })
  }

}
