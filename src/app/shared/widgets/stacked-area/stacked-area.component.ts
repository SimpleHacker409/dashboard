import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { SharedServiceService } from '../../shared-service.service';

@Component({
  selector: 'app-stacked-area',
  templateUrl: './stacked-area.component.html',
  styleUrls: ['./stacked-area.component.scss']
})
export class StackedAreaComponent implements OnInit {
  chartOptions: any;
  Highcharts = Highcharts
  charts : any;
  data : number[] = [];

    constructor(private service : SharedServiceService) {}

    ngOnInit() {
      this.initChart();
    }

    async initChart() {
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
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        tooltip: {
            shared: true,
            headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
        },
        plotOptions: {

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
        global: {
          useUTC: false // true by default
        },
        credits: {
          enabled:false
        },
        exporting : {
          enabled: true
        },
        series: [{
            name: await this.service.getCurrentUser().then((res)=>{return res.company_name}),
            data: await this.service.getRentals(),
            marker : {
              symbol: 'circle',
              radius: 2
            },
            color: '#eb548c'
          }, ]
      };
      HC_exporting(Highcharts);
    }


}

//Documentation For highcharts
//https://github.com/highcharts/highcharts-angular
