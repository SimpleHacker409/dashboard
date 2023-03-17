import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookingsComponent } from './bookings/bookings.component';
import { RidersComponent } from './riders/riders.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PricingComponent } from './pricing/pricing.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { BikesComponent } from './bikes/bikes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { PlacesComponent } from './places/places.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent,
      children: [
        {path: 'booking', component: BookingsComponent},
        {path: 'homepage', component: HomepageComponent},
        {path: 'bookings', component: BookingsComponent},
        {path: 'promotions', component: PromotionsComponent},
        {path: 'riders', component: RidersComponent},
        {path: 'pricing', component: PricingComponent},
        {path: 'bikes', component: BikesComponent},
        {path: 'manager', component: ManagerComponent},
        {path: 'reports', component: ReportsComponent},
        {path: 'settings', component: SettingsComponent},
        {path: 'places', component: PlacesComponent},
        {path: '', redirectTo: '/dashboard/homepage', pathMatch: 'full'},
      ]},
      {path: '', redirectTo: '/dashboard/homepage', pathMatch: 'full'},
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent},
      {path: '**', component: PageNotFoundComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
