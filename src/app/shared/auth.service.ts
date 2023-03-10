import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : any;

  constructor(
    private router: Router
  ) {
    this.checkUserLoggedIn()
   }

  public async login(user: { username: string, password: string }) {
    const headers = { 'Content-Type': 'application/json' };
    try {
      const response = await axios.post('https://portal.evolvomobility.com:300/login', user, {headers});
      if(await response.data.status == "success") {

        this.saveToken(response.data.result[0].domain, response.data.result[0].cid, 'admin')
        this.router.navigate(['/dashboard'])
        .then(() => {
          window.location.reload();
        });
        return "Success";
      } else {
        return "Login Failed";
      }
    } catch (error) {
      console.log(error);
      return "Server problem";
    }
    //this.user = {user:user, password:password}
  }
  //this code checks the used in manager list and if exist take company id and just changing email from the manager
  public async managerLogin(user: { email: string, pass: string }) {
    const headers = { 'Content-Type': 'application/json' };
    try {
      const response = await axios.post('https://portal.evolvomobility.com:300/Managerlogin', user, {headers});
      if(await response.data.status == "success") {

        this.saveToken(response.data.result[0].pmail, response.data.result[0].cid, 'manager')
        this.router.navigate(['/dashboard'])
        .then(() => {
          window.location.reload();
        });
        return "Success";
      } else {
        return "Login Failed";
      }
    } catch (error) {
      console.log(error);
      return "Server problem";
    }
    //this.user = {user:user, password:password}
  }

  public logout() {
    console.log("LogOut");
    this.removeToken()
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }

  public isLogedIn() {
    if(localStorage.getItem('userToken')){
      return true;
    } else {
      return false;
    }
  }

  public getUser() {
    return this.user;
  }

  private saveToken(user, userId, type) {
    let loginSession = {user: user, userId, type}
    console.log(loginSession);

    localStorage.setItem('userToken',JSON.stringify(loginSession))
  }
  private removeToken() {
    localStorage.clear()
  }

  private checkUserLoggedIn() {
    let user = JSON.parse(localStorage.getItem('userToken'))
      this.user = user;
  }
}
