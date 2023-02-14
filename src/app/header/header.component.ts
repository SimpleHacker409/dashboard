import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "../shared/auth.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor (
    private auth: AuthService,
  ) {}

  ngOnInit(): void {}

  toggleSideBar() {
    this.toggleSideBarForMe.emit();

    // area charts need this event because they dont adjust to the slidebar resize
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 200);
  }

  logout() {
    this.auth.logout()
  }
  getCurrentUser(){
     console.log(this.auth.getUser());
  }
  isLoggedIn() {
    console.log(this.auth.isLogedIn());
  }
}
