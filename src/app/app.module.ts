import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SideBarComponent } from './side-bar/side-bar.component';

import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { PlacesComponent } from './places/places.component';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from './shared/shared.module';
import { SharedServiceService } from './shared/shared-service.service';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';





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
    ModalPopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatBadgeModule,
    MatTabsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    RouterModule.forRoot([
      {path: 'homepage', component: HomepageComponent},
      {path: 'bookings', component: BookingsComponent},
      {path: 'promotions', component: PromotionsComponent},
      {path: 'riders', component: RidersComponent},
      {path: 'pricing', component: PricingComponent},
      {path: 'bikes', component: BikesComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'places', component: PlacesComponent},
      {path: '', redirectTo: '/homepage', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent,}
    ]),
    SharedModule,
  ],
  providers: [SharedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
