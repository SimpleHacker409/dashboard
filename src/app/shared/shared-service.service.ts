import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, from,forkJoin } from 'rxjs';
import { map, switchMap,mergeMap } from 'rxjs/operators';
import axios from 'axios';
// @ts-ignore
import {format} from 'date-fns'

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
const URL = 'https://portal.evolvomobility.com:300/'
const BackenURL = 'https://backofficeapi.evolvomobility.com/'
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
    {name:'bookings',icon:'bookings'},
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

  ngOnInit() {}
  cid = JSON.parse(localStorage.getItem('userToken'))


/*   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  } */
  async getCurrentUser () {
    try {
      const response = await axios.get(URL+'getUser?userID='+this.cid.userId)
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
      //console.log(error);
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
      const response = await axios.post(URL+'addWhitelist', data, {headers});
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
    const res = await axios.get(URL+'getWhitelist?userID='+this.user.cid)
    //console.log(res.data.result);

    return res.data.result
  }

  async addManager(person) {
    const headers = { 'Content-Type': 'application/json' };
    return axios.post(URL+'insertManager', person, {headers});
  }

  async addPricelist(price) {
    const headers = { 'Content-Type': 'application/json' };
    return axios.post(URL+'insertPrice', price, {headers});
  }
  async updatePrice(price) {
    const headers = { 'Content-Type': 'application/json' };
    return axios.put(URL+'updatePrice', price, {headers});
  }
  async deletePrice(id) {
    return axios.delete(URL+'deletePrice?id='+id)
  }
  async getPricelist() {
    return axios.get(URL+'getPricelist?cid='+this.user.cid);
  }

  async getManagerList() {
    const res = await axios.get(URL+'getManager?cid='+this.user.cid)
    return res.data.result
  }
  async getCompanies() {
    return axios.get(URL+'getCompanies');
  }

  async insertBike(bike) {
    const headers = { 'Content-Type': 'application/json' };
    return axios.post(URL+'insertBike', bike, {headers})
  }
  async getBikes(){
    return axios.get(URL+'getBike?cid='+this.user.cid+'&aid=c100')
  }
  async updateBike(bike) {
    const headers = { 'Content-Type': 'application/json' };
    return axios.put(URL+'updateBike', bike, {headers})
  }

  async removeBike(id){
    return axios.delete(URL+'removeBike?id='+id)
  }

  async unlockBike(device_id,unlocKey){
    try{
      const body = {key:unlocKey}
      const res = await axios.post('https://apievolvo.azurewebsites.net/api/unlock?device_id='+device_id,body)
      return 200
    }catch(err)
    {
      return 500
    }
  }

  async deleteManager(email) {
    return axios.delete(URL+'deleteManager?email='+email)
  }

  async deleteWhitelist(email) {
    return axios.delete(URL+'deleteWhitelist?email='+email+'&cid='+this.user.cid)
  }

  async getRentals() {
    const res = await axios.get(URL+'getRentals?cid='+this.user.cid)

    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    res.data.data.forEach((value) => {
      const tripDate = new Date(value.trip_start);
      const month = tripDate.getMonth();
      data[month]++;
      //console.log(data);
      })
    return data;
  }

  async getCompanyRentals(){
    return await axios.get(URL+'getRentals?cid='+this.user.cid)
  }

  async changeWhiteListStatus(email, statusToChange) {
    const headers = { 'Content-Type': 'application/json' };
    const data = {"cid": this.user.cid,"email":email,"status": statusToChange}
    try {
      const response = await axios.put(URL+'changeWhitelistStatus', data, {headers});
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
  getBookings(): Observable<any[]>{
    const date = new Date()
    return from(this.getBookingsFunction()).pipe(
      mergeMap((pid: any[]) => {
        const apiCalls = pid.map((place) => axios.get('https://backofficeapi.evolvomobility.com/get_bookings_filtered?facilityID='+place.pid+'&startDate=2020-02-10&endDate='+date.getFullYear()+'-'+String(date.getMonth()+2).padStart(2,"0")+'-'+date.getDate()) )
        return forkJoin(apiCalls)
      }),
      map((results:any[]) => {
        return results.reduce((acc, curr) => acc.concat(curr),[])
      })
    )
  }

  async getBookingsFunction(){

    //Get places of the company
    const place_res = await axios.get(URL+'getPlace')
    const pid = place_res.data.result.filter(item => item.cid == this.user.cid)
    return pid
  }

  formatDate(date, formatdate){
    return format(date, formatdate)
  }

}
