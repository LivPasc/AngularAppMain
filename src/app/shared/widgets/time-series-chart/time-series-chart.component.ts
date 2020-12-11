import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'chart.js';
import { Charts } from 'src/app/Charts';

@Component({
  selector: 'app-time-series-chart',
  templateUrl: './time-series-chart.component.html',
  styleUrls: ['./time-series-chart.component.scss'],
})
export class TimeSeriesChartComponent implements OnInit, AfterViewInit {
  @Input() data: Charts[] = [];

  @ViewChild('mychart') mychart;

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
    if(this.data != null && this.data != undefined){
    const dataset = this.data.map(x => x.value);
    const date = this.data.map(x => x.dateTime);
    this.buildChart(date,dataset);}
  }

  ngAfterViewInit(): void {
  }

  private buildChart(label: Date[], dataset: number[]) {
    console.log(dataset);
    console.log(label);

    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    this.mychart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Temperature in °C',
            backgroundColor: 'rgba(255,221,50,0.2)',
            borderColor: 'rgba(255,221,50,1)',
            data: dataset,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Temperature',
        },
        labels: ['Temperature in °C'],
        legend: {
          display: true,
          legendText: ['Temperature in °C'],
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                displayFormats: {
                  quarter: 'MMM YYYY',
                },
              },
              display: true,
            },
          ],
          yAxes: [
            {
              display: true,
            },
          ],
        },
      },
    });
  }
}
