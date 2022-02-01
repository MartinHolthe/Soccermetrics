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

  ngOnInit(): void {
    this.bundesligaService.getPlayers().subscribe((result) => {
      console.log('getPlayers succeded', result);
      this.percentiles = result;
    });

    
  }

  onPlayerSelected(selectedPlayerId: string): void {
    this.bundesligaService
      .getPlayerById(selectedPlayerId)
      .subscribe((result) => {
        console.log('getPlayerById succeded', result);
        this.percentilesId = result;

        this.chart = new Chart('canvas', {
          type: 'polarArea',
          data: {
            labels: [this.percentilesId.player],
            datasets: [
              {
                label: 'My First Dataset',
                data: [this.percentilesId['Dribbled Past'],2, 4, 3, 14],
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
      });
      console.log(this.percentilesId)
  }

/* rotelle(percentilesId: any) {
  this.chart = new Chart('canvas', {
    type: 'polarArea',
    data: {
      labels: [this.percentilesId?.player],
      datasets: [
        {
          label: 'My First Dataset',
          data: [11, 16, 7, 3, 14],
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
} */
} 
