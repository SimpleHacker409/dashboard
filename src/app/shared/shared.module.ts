import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighchartsChartModule } from 'highcharts-angular';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { SharedServiceService } from '../shared/shared-service.service';


import { StackedAreaComponent } from './widgets/stacked-area/stacked-area.component';
import { VariableRadiusComponent } from './widgets/variable-radius/variable-radius.component';
import { BarChartComponent } from './widgets/bar-chart/bar-chart.component';
import { TableComponentComponent } from './widgets/table-component/table-component.component';
import { DashCardsComponent } from './widgets/dash-cards/dash-cards.component';

@NgModule({
  declarations: [
    StackedAreaComponent,
    VariableRadiusComponent,
    BarChartComponent,
    TableComponentComponent,
    DashCardsComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [
    StackedAreaComponent,
    VariableRadiusComponent,
    BarChartComponent,
    TableComponentComponent,
    DashCardsComponent
  ],
  providers: [
    SharedServiceService
  ]
})
export class SharedModule { }
