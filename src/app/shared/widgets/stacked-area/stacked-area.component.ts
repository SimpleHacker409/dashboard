import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-stacked-area',
  templateUrl: './stacked-area.component.html',
  styleUrls: ['./stacked-area.component.scss']
})
export class StackedAreaComponent implements OnInit {
  chartOptions: any;
  Highcharts = Highcharts

    constructor() { }

    ngOnInit() {
      this.chartOptions = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Bikes economic activity'
        },
        subtitle: {
            text: 'Source: ' +
                '<a href="https://www.evolvo.com"' +
                'target="_blank">Evolvo</a>'
        },
        yAxis: {
            title: {
                useHTML: true,
                text: 'Total Rides-equivalents'
            }
        },
        tooltip: {
            shared: true,
            headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
        },
        plotOptions: {
            series: {
                pointStart: 2012
            },
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        credits: {
          enabled:false
        },
        exporting : {
          enabled: true
        },
        series: [{
            name: 'Turin',
            data: [13234, 12729, 11533, 17798, 10398, 12811, 15483, 16196, 16214],
            marker : {
              symbol: 'circle',
              radius: 2
            },
            color: '#eb548c'
          }, {
            name: 'South Italy',
            data: [6685, 6535, 6389, 6384, 6251, 5725, 5631, 5047, 5039],
            marker : {
              symbol: 'circle',
              radius: 2
            },
            color: '#db4cb2'
        }, {
            name: 'Upcoming Orders',
            data: [2019, 2189, 2150, 2217, 2175, 2257, 2344, 2176, 2186],
            marker : {
              symbol: 'circle',
              radius: 2
            },
            color: '#af4bce'
        }]
      };
      HC_exporting(Highcharts);
    }

}

//Documentation For highcharts
//https://github.com/highcharts/highcharts-angular
