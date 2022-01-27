import { Component, OnInit } from '@angular/core';
import {Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-rotelle',
  templateUrl: './rotelle.component.html',
  styleUrls: ['./rotelle.component.scss'],
})
export class RotelleComponent implements OnInit {
  chart:any;

  constructor() {}

  ngOnInit(): void {
    this.chart = document.getElementById('rotelle')
    Chart.register(...registerables);
    this.loadChart();
  }

  loadChart(): void {
    new Chart('rotelle', {
      type: 'polarArea',
      data: {
        labels: ['Player Name'],
        datasets: [
          {
            label: '# of Votes',
            data: [100, 100, 100, 100, 100, 90, 90, 90, 90, 90, 80, 80, 80, 80, 80, 70, 70, 70, 70,  70, 60, 60, 60, 60, 60 ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', 
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(54, 162, 235, 0.2)',

              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 206, 86, 0.2)',

              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',

              'rgba(153, 102, 255, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 99, 132, 1)',             

              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(54, 162, 235, 1)',

              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',

              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',

              'rgba(153, 102, 255, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            color: '#36A2EB',
            anchor: 'end'
          }
        },
        responsive:true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
