import { Component, OnInit } from '@angular/core';
import { BundesligaService } from '../shared/services/bundesliga.service';
import { Percentiles } from '../interfaces/percentiles';
import { PercentilesId } from '../interfaces/percentilesId';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bundesliga',
  templateUrl: './bundesliga.component.html',
  styleUrls: ['./bundesliga.component.scss'],
})
export class BundesligaComponent implements OnInit {
  constructor(private bundesligaService: BundesligaService) {}

  percentiles: Percentiles[] = [];
  PlayerSelected: Number | undefined;
  percentilesId!: PercentilesId | undefined;
  chart: any;
  selectedPlayerId: Number | undefined;

  ngOnInit(): void {
    this.bundesligaService.getPlayers().subscribe((result) => {
      console.log('getPlayers succeded', result);
      this.percentiles = result;
    });
  }

  onPlayerSelected(selectedPlayerId: number): void {
    console.log(this.percentiles[selectedPlayerId]);

    this.chart = new Chart('canvas', {
      type: 'polarArea',

      data: {
        labels: [],
        datasets: [
          {
            label: this.percentiles[selectedPlayerId].player,
            data: [
              this.percentiles[selectedPlayerId]['Key Passes Per 90'], //How to parese this to string
              6,
              5,
              4,
              3,
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
              'rgb(54, 162, 235)',
            ],
          },
        ],
      },
    });
  }
}
