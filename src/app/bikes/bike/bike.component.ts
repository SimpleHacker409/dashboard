import { Component, OnInit } from '@angular/core';

interface DropDowns {
  id: string;
  name: string;
}

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss']
})
export class BikeComponent implements OnInit {

  selectedCompany: string;
  selectedPlace: string;
  selectedDiscount: string;
  selectedStatus: string;
  selectedUser: string;

  companies : DropDowns[] = [
    {id: 'octaid-0', name: 'Octalabz'},
    {id: 'com-1', name: 'Company 2'},
    {id: 'com-2', name: 'Company 3'},
  ];

  places : DropDowns[] = [
    {id: 'placeid-0', name: 'Place-1'},
    {id: 'placeid-1', name: 'Place-2'},
    {id: 'placeid-2', name: 'Place-3'},
  ];

  discount : DropDowns[] = [
    {id: 'placeid-0', name: 'Place-1'},
    {id: 'placeid-1', name: 'Place-2'},
    {id: 'placeid-2', name: 'Place-3'},
  ];

  status : DropDowns[] = [
    {id: 'placeid-0', name: 'Place-1'},
    {id: 'placeid-1', name: 'Place-2'},
    {id: 'placeid-2', name: 'Place-3'},
  ];

  bike_user : DropDowns[] = [
    {id: 'placeid-0', name: 'Place-1'},
    {id: 'placeid-1', name: 'Place-2'},
    {id: 'placeid-2', name: 'Place-3'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
