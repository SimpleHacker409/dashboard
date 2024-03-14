import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../shared/shared-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormGroup, FormControl, Validators} from '@angular/forms';

export interface UserData {
  date: string;
  status: string;
  schedule: string;
  name: string;
  price: string;
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements AfterViewInit {

  isLoading: boolean;

  range = new FormGroup({
    start: new FormControl(null, Validators.required),
    end: new FormControl(null, Validators.required),
  });

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['date', 'status', 'schedule', 'name', 'price'];
  displayedColumnsNew: string[]=['trip_start', 'trip_end','reservation_status', 'mail','bike_name']
  constructor(private sharedService: SharedServiceService,) {
/*     this.dataSource = new MatTableDataSource()
    this.isLoading = true;
    this.sharedService.getBookings().subscribe((res) => {
        this.isLoading = false
        this.dataSource = new MatTableDataSource(res[0].data.result.reverse())
        console.log(this.dataSource);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    ) */
    this.dataSource = new MatTableDataSource()
    this.isLoading = true;
    this.loadRentals()
    
  }

  async loadRentals(){
    try{
      const reservations = await this.sharedService.getCompanyRentals()
      this.dataSource = new MatTableDataSource(reservations.data.data)
      console.log(this.dataSource);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false
    } catch(err) {
      console.log("Error loading Rentals",err);
    }
    
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dateFormat(date){
    return this.sharedService.formatDate(new Date(date), 'MM/dd HH:mm')
  }

}
