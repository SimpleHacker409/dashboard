import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import axios from 'axios';

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

  constructor() {}

  Adminmenu =
  [
    {name:'homepage',icon:'homepage'},
    {name:'bookings',icon:'bookings'},
    {name:'bikes',icon:'bike_scooter'},
    {name:'riders',icon:'sports_motorsports'},
    {name:'pricing',icon:'payment'},
    {name:'manager',icon:'manage_accounts'},
    {name:'places',icon:'home_work'},
    {name:'promotions',icon:'wallet'},
    {name:'reports',icon:'report'},
    {name:'settings',icon:'settings'}
  ];

  Usermenu =
  [
    {name:'homepage',icon:'homepage'},
    {name:'bikes',icon:'bike_scooter'},
    {name:'riders',icon:'sports_motorsports'},
    {name:'pricing',icon:'payment'},
    {name:'manager',icon:'manage_accounts'},
  ];

  Managermenu =
  [
    {name:'homepage',icon:'homepage'},
    {name:'bikes',icon:'bike_scooter'},
    {name:'riders',icon:'sports_motorsports'},
    {name:'pricing',icon:'payment'},
  ];

  user : User;
  userStatus : string;
  cid = JSON.parse(localStorage.getItem('userToken'))

  ngOnInit() {}

/*   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  } */
  async getCurrentUser () {
    try {
      const response = await axios.get('https://portal.evolvomobility.com:300/getUser?userID='+this.cid.userId)
      this.user = await response.data.result[0]
      //await this.delay(1000);
      if(this.cid.type == 'manager'){
        this.user.pmail = this.cid.user
        this.user.status = 'manager'
      }
      //console.log(this.user);

      this.userStatus = await response.data.result[0].status;
      return this.user;

    } catch(error) {
      console.log("User GetError");
    }
    //this.user = await axios.get('/getUser?='+cid.userId)
  }
  getMenu() {
    //console.log(this.userStatus);

    if(this.userStatus == "admin") {
      return this.Adminmenu;
    } else if(this.userStatus == 'company') {
      return this.Usermenu;
    } else {
      return this.Managermenu;
    }
  }

  async addWhiteList(emails, startDate, endDate) {
    const headers = { 'Content-Type': 'application/json' };
    let data = {"emails": emails,"cid":this.user.cid,"status": "to activate","startdate": startDate, "enddate":endDate}
    try {
      const response = await axios.post('https://portal.evolvomobility.com:300/addWhitelist', data, {headers});
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
    const res = await axios.get('https://portal.evolvomobility.com:300/getWhitelist?userID='+this.user.cid)
    //console.log(res.data.result);

    return res.data.result
  }

  async addManager(person) {
    const headers = { 'Content-Type': 'application/json' };
    return axios.post('https://portal.evolvomobility.com:300/insertManager', person, {headers});
  }

  async addPricelist(price) {
    const headers = { 'Content-Type': 'application/json' };
    return axios.post('https://portal.evolvomobility.com:300/insertPrice', price, {headers});
  }
  async updatePrice(price) {
    const headers = { 'Content-Type': 'application/json' };
    return axios.put('https://portal.evolvomobility.com:300/updatePrice', price, {headers});
  }
  async deletePrice(id) {
    return axios.delete('https://portal.evolvomobility.com:300/deletePrice?id='+id)
  }
  async getPricelist() {
    return axios.get('https://portal.evolvomobility.com:300/getPricelist?cid='+this.user.cid);
  }

  async getManagerList() {
    const res = await axios.get('https://portal.evolvomobility.com:300/getManager?cid='+this.user.cid)
    return res.data.result
  }
  async getCompanies() {
    return axios.get('https://portal.evolvomobility.com:300/getCompanies');
  }

  async insertBike(bike) {
    const headers = { 'Content-Type': 'application/json' };
    return axios.post('https://portal.evolvomobility.com:300/insertBike', bike, {headers})
  }
  async getBikes(){
    return axios.get('https://portal.evolvomobility.com:300/getBike?cid='+this.user.cid+'&aid=c100')
  }
  async updateBike(bike) {
    const headers = { 'Content-Type': 'application/json' };
    return axios.put('https://portal.evolvomobility.com:300/updateBike', bike, {headers})
  }

  async removeBike(id){
    return axios.delete('https://portal.evolvomobility.com:300/removeBike?id='+id)
  }

  async unlockBike(seriel){
    const headers = { 'Accept': 'application/json' };
    return axios.post('https://evolvoiotbridgewebapp.azurewebsites.net/api/v1/unlock-device?deviceId='+seriel)
  }

  async deleteManager(email) {
    return axios.delete('https://portal.evolvomobility.com:300/deleteManager?email='+email)
  }

  async deleteWhitelist(email) {
    return axios.delete('https://portal.evolvomobility.com:300/deleteWhitelist?email='+email+'&cid='+this.user.cid)
  }

  async getRentals() {
    const res = await axios.get('https://portal.evolvomobility.com:300/getRentals?cid='+this.user.cid)
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
      const response = await axios.put('https://portal.evolvomobility.com:300/changeWhitelistStatus', data, {headers});
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
