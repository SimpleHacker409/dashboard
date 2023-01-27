import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-variable-radius',
  templateUrl: './variable-radius.component.html',
  styleUrls: ['./variable-radius.component.scss'],
})
export class VariableRadiusComponent implements OnInit {
  chartOptions: any;
  Highcharts = Highcharts;

  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Browser market shares in May, 2020',
        align: 'left',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      credits: {
        enabled:false
      },
      series: [
        {
          name: 'Brands',
          colorByPoint: true,
          data: [
            {
              name: 'Chrome',
              y: 70.67,
              sliced: true,
              selected: true,
            },
            {
              name: 'Edge',
              y: 14.77,
            },
            {
              name: 'Firefox',
              y: 4.86,
            },
            {
              name: 'Safari',
              y: 2.63,
            },
            {
              name: 'Other',
              y: 2.6,
            },
          ],
        },
      ],
    };
    HC_exporting(Highcharts);
  }
}
