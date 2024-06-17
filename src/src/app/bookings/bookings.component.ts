import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedServiceService } from '../shared/shared-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../environment';
import {MatTabGroup} from '@angular/material/tabs';

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

export class BookingsComponent implements OnInit {

  isLoading: boolean;
  isMapLoading: boolean = true;
  loadingMapError: string;
  reservedBikes: any[] = [] ;
  reservedBikePosition: any[]= []
  liveTracking:boolean;
  trackingInterval:any;

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/light-v11';
  lat: number = 41.8719;
  lng: number = 12.5674;

  range = new FormGroup({
    start: new FormControl(null, Validators.required),
    end: new FormControl(null, Validators.required),
  });
  allRentals: any;
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTabGroup) tabGroup:MatTabGroup;

  displayedColumns: string[] = ['date', 'status', 'schedule', 'name', 'price'];
  displayedColumnsNew: string[]=['trip_start', 'trip_end','reservation_status', 'mail','bike_name','distance']
  constructor(private sharedService: SharedServiceService) {
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
      this.allRentals = reservations.data.data
      this.dataSource = new MatTableDataSource(this.allRentals)
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false
    } catch(err) {
      console.log("Error loading Rentals",err);
    }
    
  }

  ngOnInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyDateFilter(){
/*     this.allRentals.forEach(rental => {
      if(this.sharedService.isDateAfter(rental.trip_start,this.range.controls.start.value) && this.sharedService.isDateBefore(rental.trip_end,this.range.controls.end.value)){
        console.log(rental);
      }
      
    }) */
    this.dataSource = this.allRentals.filter(rental => {
      if(this.sharedService.isDateAfter(rental.trip_start,this.range.controls.start.value) && this.sharedService.isDateBefore(rental.trip_end,this.range.controls.end.value)) return rental
    })
  }

  dateFormat(date){
    if(date) return this.sharedService.formatDate(new Date(date), 'MM/dd HH:mm')
    else return '--/--'
  }

  selectedEventChange(event){    
    if(event.index == 1 && this.map == undefined) {
      setTimeout(()=>{
        this.map = new mapboxgl.Map({
          accessToken: environment.mapbox.accessToken,
          container: 'map',
          style: this.style,
          zoom: 5,
          center: [this.lng, this.lat]
        });

        this.map.on('load',async ()=> {
          this.getReservedBikesFiltered()
        });

      },500)
    }
  }

  async getReservedBikesFiltered(){
    try{
      this.loadingMapError = '';
      //const testBikes = [{device_id:'267cda58-db3f-4765-8ae6-be252a95f7ff',name:'Bike 1'},{device_id:'00a95e30-7b92-4b45-befc-ae6e6813c14d',name:'Bike 2'},{device_id:'3abd5a6d-c90b-4be2-a622-fa1f023cef03',name:'Bike 4'}]
      const allBikes = await this.sharedService.getBikes()
      this.reservedBikes = allBikes.data.result;
      //console.log(this.reservedBikes);
      
      this.getReservedBikePosition(this.reservedBikes);
    } catch(err){
      this.isMapLoading = false;
      this.loadingMapError = 'Error getting bikes'
    }
  }

  async getReservedBikePosition(reservedBikes){
    reservedBikes.forEach(bike => {
      this.sharedService.getBikeinfo(bike.device_id).then(info => {

        if(info != 500 && info.payload.gnssInfo[4]) {
          this.map.loadImage('https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
          (error,image)=>{
            if(error) throw error;

            this.map.addImage(bike.bike_name,image);

            this.map.addSource(
              bike.bike_name, 
              {
                'type': 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': [
                    {
                      'type': 'Feature',
                      'geometry': {
                        'type': 'Point',
                        'coordinates': [info.payload.gnssInfo[5], info.payload.gnssInfo[4]]
                      },
                      'properties': {
                        'title': bike.bike_name
                      }
                    },
                  ]
                }
              }
            );
        
            this.map.addLayer({
              'id': bike.bike_name,
              'type': 'symbol', // circle marker types
              'source': bike.bike_name, // reference the data source
              'layout': {
                'text-field':['get','title'],
                'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                'text-size':12,
                'text-radial-offset': 1.2,
                'text-justify': 'auto',
                'icon-image':bike.bike_name,
                'icon-size':0.08,
              },
            });
          })
          this.map.flyTo({
            'animate':true,
            'center':[info.payload.gnssInfo[5], info.payload.gnssInfo[4]],
            'zoom':10,
            'duration':1000
          })
          this.isMapLoading = false;
        } else {
          this.isMapLoading = false;
          this.loadingMapError = this.loadingMapError+ ' ,' + bike.bike_name 
        }
      })
    })
    console.log(this.reservedBikePosition)
  }

  updateLiveMapData(status:boolean){
    if(!this.liveTracking && status){
      this.liveTracking = true;
      this.trackingInterval = setInterval(()=>{
        this.reservedBikes.forEach(bike => {
          this.sharedService.getBikeinfo(bike.device_id).then(info => {
            
            if(info !== 500 && info.payload.gnssInfo[4]) {
              const bikeSource: mapboxgl.GeoJSONSource = this.map.getSource(bike.bike_name) as mapboxgl.GeoJSONSource;
              bikeSource.setData({
                'type': 'FeatureCollection',
                'features': [
                  {
                    'type': 'Feature',
                    'geometry': {
                      'type': 'Point',
                      'coordinates': [info.payload.gnssInfo[5], info.payload.gnssInfo[4]]
                    },
                    'properties': {
                      'title': bike.bike_name
                    }
                  },
                ]
              })
            }
          })
        })
      },15000)
    }
    if(!status){
      this.liveTracking = false;
      clearInterval(this.trackingInterval)
    }
/*     const bikeSource: mapboxgl.GeoJSONSource = this.map.getSource('bike') as mapboxgl.GeoJSONSource;
    bikeSource.setData({
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [info.payload.gnssInfo[5], info.payload.gnssInfo[4]]
          },
          'properties': {
            'title': bike.bike_name
          }
        },
      ]
    }) */

  }
}
