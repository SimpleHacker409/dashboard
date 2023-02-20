import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/widgets/snackbar-component/snackbar-component.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  durationInSeconds = 5;

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  editPrice() {
    this.openSnackBar("Alert","Plan customization is disabled for now")
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
