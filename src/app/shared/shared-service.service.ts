import { Injectable } from '@angular/core';
import { Axios } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }

  dashCardFunction() {
    var dashCard = [
      {
        dasTitle:"User Data",
        data:"10K",
        description:"User Registraion",
        icon:"group",
      },{
        dasTitle:"Kilometer",
        data:"30K",
        description:"Kilometer Recording",
        icon:"map",
      },{
        dasTitle:"Revenue",
        data:"12K",
        description:"Total Price",
        icon:"payments",
      },{
        dasTitle:"Locations",
        data:"12",
        description:"Places",
        icon:"location_city",
      }
    ]
    return dashCard;
  }
  getLog() {
    var logData = [
      {name: 'Maximo David', weight: "Booked E-Bike-1", symbol: '27/01/2023 12:57'},
      {name: 'Rebeca Soreti', weight: "Booked E-Bike-5", symbol: '25/01/2023 21:23'},
      {name: 'Valentina', weight: "Requested Refund", symbol: '24/01/2023 13:32'},
      {name: 'Arnesto Damiyani', weight: "Trip Ended", symbol: '22/01/2023 22:57'},
      {name: 'Naman Guptha', weight: "App Report", symbol: '20/01/2023 14:16'},
    ];
    return logData;
  }
  getBookings() {
    var bookings = [
      {day: 'Monday',date: '27/01/2023', status: "Active", schedule: '1h:30m', email: 'maximowe@mail.com', price: '12,20'},
      {day: 'Sunday',date: '12/01/2023', status: "Canceled", schedule: '0h:40m', email: 'marvel12@mail.com', price: '10,50'},
      {day: 'Wednesday',date: '21/01/2023', status: "Active", schedule: '0h:25m', email: 'chiminonos@mail.com', price: '6,00'},
      {day: 'Monday',date: '04/01/2023', status: "Waiting", schedule: '1h:40m', email: 'miurads445@mail.com', price: '13,30'},
      {day: 'Monday',date: '18/01/2023', status: "Active", schedule: '4h:30m', email: 'arusinbs98@mail.com', price: '26,23'},
      {day: 'Tuesday',date: '25/01/2023', status: "Scheduled", schedule: '8h:00m', email: 'maximowe@mail.com', price: '40,60'},
      {day: 'Sunday',date: '03/01/2023', status: "Active", schedule: '1h:00m', email: 'maximowe@mail.com', price: '11,00'},
      {day: 'Monday',date: '27/01/2023', status: "Active", schedule: '6h:10m', email: 'maximowe@mail.com', price: '32,22'},
      {day: 'Monday',date: '27/01/2023', status: "Active", schedule: '1h:30m', email: 'maximowe@mail.com', price: '12,20'},
      {day: 'Sunday',date: '12/01/2023', status: "Canceled", schedule: '0h:40m', email: 'marvel12@mail.com', price: '10,50'},
      {day: 'Wednesday',date: '21/01/2023', status: "Active", schedule: '0h:25m', email: 'chiminonos@mail.com', price: '6,00'},
      {day: 'Monday',date: '04/01/2023', status: "Waiting", schedule: '1h:40m', email: 'miurads445@mail.com', price: '13,30'},
      {day: 'Monday',date: '18/01/2023', status: "Active", schedule: '4h:30m', email: 'arusinbs98@mail.com', price: '26,23'},
      {day: 'Tuesday',date: '25/01/2023', status: "Scheduled", schedule: '8h:00m', email: 'maximowe@mail.com', price: '40,60'},
      {day: 'Sunday',date: '03/01/2023', status: "Active", schedule: '1h:00m', email: 'maximowe@mail.com', price: '11,00'},
      {day: 'Monday',date: '27/01/2023', status: "Active", schedule: '6h:10m', email: 'maximowe@mail.com', price: '32,22'},
    ];
    return bookings;
  }

}
