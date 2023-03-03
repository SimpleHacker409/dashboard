import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormGroup, FormControl} from '@angular/forms';
import { SharedServiceService } from '../shared/shared-service.service';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/widgets/snackbar-component/snackbar-component.component';

export interface PeriodicElement {
  name: string;
  email: string;
  status: string;
  user_id: string;
}
export interface Whitelist {
  email: string;
}

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],

})
export class RidersComponent implements OnInit {
  selected : any;
  isSelectChanged : any;
  durationInSeconds = 5;

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  emails: Whitelist[] = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  dataSource = new MatTableDataSource<any>();
  data = [];

  constructor(
    private service: SharedServiceService,
    private _snackBar: MatSnackBar,)
    {
      this.loadUserData()
    }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['name', 'email', 'status', 'user_id'];
  //dataSource = new MatTableDataSource(this.data);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectStatus(event_data, data) {
    this.service.changeWhiteListStatus(data, event_data)
    .then((res)=>{
      console.log(res);
      if(res.status != "error") {
        this.openSnackBar(data, "changed status : " + event_data)
      } else {
        this.openSnackBar("Error", "changed status : " + event_data)
      }
    })
    this.isSelectChanged = true;
  }

  loadUserData() {
    this.service.getWhiteList().then((res)=>{
      this.data = res;
      this.dataSource.data = this.data;
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add email
    if (value) {
      this.emails.push({email: value});
      console.log(this.emails);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(email: Whitelist): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
      console.log(this.emails);
    }
  }
  async addUsers() {
    console.log("Adduser");

    const startDate = this.dateFormat(this.range.value.start)
    const endDate = this.dateFormat(this.range.value.end)
    const response = await this.service.addWhiteList(this.emails, startDate, endDate)
    if(response == "Success") {
      this.emails.splice(0, this.emails.length)
      this.range.reset();
      this.openSnackBar("WhiteList Updated Sucessfully", "Alert email sent to the users")
    } else {
      this.openSnackBar("WhiteList Updated Failed", "Please try again with proper format")
    }
    this.loadUserData()
  }

  dateFormat(adjustdate) {
    try {
      var year = adjustdate.getFullYear()
      var month = adjustdate.getMonth()+1
      var date = adjustdate.getDate()
    } catch(err) {
        setTimeout(() => {
        this.openSnackBar("*Important", "no time limit for the users added")
        }, 3000);
      return "";
    }
    return `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
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
  deleteRider(email) {
    confirm("email")
    console.log("Deleted" + email);

  }

}
