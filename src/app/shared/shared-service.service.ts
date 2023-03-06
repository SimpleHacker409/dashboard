import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';

export interface User {
  id: number;
  cid: string;
  company_name: string;
  manager_name: string;
  manager_surname
  address: string
  piva: string,
  sdi: string,
  phone: string,
  iban: string,
  domain: string,
  white_list: number,
  status: string,
  pmail: string,
  cmail: string,
  pass: string,
  logo: string
}

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService implements OnInit {

  constructor(private auth : AuthService) {}

  Adminmenu =
  [
    {name:'homepage',icon:'homepage'},
    {name:'bookings',icon:'bookings'},
    {name:'bikes',icon:'bike_scooter'},
    {name:'riders',icon:'sports_motorsports'},
    {name:'pricing',icon:'payment'},
    {name:'places',icon:'home_work'},
    {name:'promotions',icon:'wallet'},
    {name:'reports',icon:'report'},
    {name:'settings',icon:'settings'}
  ];

  Usermenu =
  [
    {name:'homepage',icon:'homepage'},
    {name:'riders',icon:'sports_motorsports'},
    {name:'pricing',icon:'payment'},
  ];

  user : User;
  userStatus : string;
  cid = JSON.parse(localStorage.getItem('userToken'))

  ngOnInit() {
    this.getCurrentUser()
    console.log("Shared Service");
  }

  async getCurrentUser () {
    try {
      const response = await axios.get('http://75.119.144.170:300/getUser?userID='+this.cid.userId)
      this.user = await response.data.result[0]
      //console.log(this.user);

      this.userStatus = await response.data.result[0].status;
      return response.data.result[0];
    } catch(error) {
      //console.log("User GetError");
    }
    //this.user = await axios.get('/getUser?='+cid.userId)
  }

  getMenu() {
    //console.log(this.userStatus);

    if(this.userStatus == "admin") {
      return this.Adminmenu;
    } else {
      return this.Usermenu;
    }
  }

  async addWhiteList(emails, startDate, endDate) {
    const headers = { 'Content-Type': 'application/json' };
    let data = {"emails": emails,"cid":this.user.cid,"status": "to activate","startdate": startDate, "enddate":endDate}
    try {
      const response = await axios.post('http://75.119.144.170:300/addWhitelist', data, {headers});
      if(await response.data.status == "success") {
        return "Success";
      } else {
        return "Update Failed";
      }
    } catch (error) {
      //console.log(error);
      return "Server problem";
    }
  }
  async getWhiteList(){
    const res = await axios.get('http://75.119.144.170:300/getWhitelist?userID='+this.cid.userId)
    //console.log(res.data.result);

    return res.data.result
  }

  async deleteWhitelist(email) {
    return axios.delete('http://75.119.144.170:300/deleteWhitelist?email='+email+'&cid='+this.cid.userId)
  }

  async getRentals() {
    const res = await axios.get('http://75.119.144.170:300/getRentals?cid='+this.user.cid)
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    res.data.data.forEach((value) => {
      const tripDate = new Date(value.trip_start);
      const month = tripDate.getMonth();
      data[month]++;
      //console.log(data);
      })
    return data;
  }

  async changeWhiteListStatus(email, statusToChange) {
    const headers = { 'Content-Type': 'application/json' };
    const data = {"cid": this.user.cid,"email":email,"status": statusToChange}
    try {
      const response = await axios.put('http://75.119.144.170:300/changeWhitelistStatus', data, {headers});
      return response;
    } catch(err) {
      return {status: "error", message: err}
    }
  }

  dashCardFunction() {
    var dashCard = [
      {
        dasTitle:"User Data",
        data:0,
        description:"User Registraion",
        icon:"group",
      },{
        dasTitle:"Kilometer",
        data:0,
        description:"Kilometer Recording",
        icon:"map",
      },{
        dasTitle:"Revenue",
        data:0,
        description:"Total Price",
        icon:"payments",
      },{
        dasTitle:"Locations",
        data:1,
        description:"Place",
        icon:"location_city",
      }
    ]
    return dashCard;
  }

  getLog() {
    var logData = [
      {name: '_', data: "_", time: '_'},
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
