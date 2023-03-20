import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookingsComponent } from './bookings/bookings.component';
import { RidersComponent } from './riders/riders.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PricingComponent } from './pricing/pricing.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { BikesComponent } from './bikes/bikes.component';
import { BikeComponent } from './bikes/bike/bike.component';
import { WhiteListComponent } from './riders/white-list/white-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SignupComponent } from './signup/signup.component';
import { PlacesComponent } from './places/places.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerComponent } from './manager/manager.component';
import { AddmanagerComponent } from './manager/addmanager/addmanager.component';
import { AddpriceComponent } from './pricing/addprice/addprice.component';

import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from './material.module'
import { SharedModule } from './shared/shared.module';
import { SharedServiceService } from './shared/shared-service.service';
import { AuthService } from './shared/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    BookingsComponent,
    RidersComponent,
    PromotionsComponent,
    PricingComponent,
    ReportsComponent,
    SettingsComponent,
    BikesComponent,
    BikeComponent,
    WhiteListComponent,
    PageNotFoundComponent,
    SideBarComponent,
    PlacesComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    ManagerComponent,
    AddmanagerComponent,
    AddpriceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    SharedServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

