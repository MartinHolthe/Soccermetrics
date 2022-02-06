import { Component, OnInit } from '@angular/core';
import { BundesligaService } from '../shared/services/bundesliga.service';
import { Percentiles } from '../interfaces/percentiles';
import { PercentilesId } from '../interfaces/percentilesId';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  selectedPlayerId: Number | undefined;
  chart: any;

  ngOnInit(): void {
    this.bundesligaService.getPlayers().subscribe((result) => {
      console.log('getPlayers succeded', result);
      this.percentiles = result;
    });
  }
  
  //convert (){
  //if(PlayerSelected = this.percentile.player) {
  //   return this.percentile.id
  //  }
  // }

  onPlayerSelected(selectedPlayerId: number): void {
    console.log('Selected player: ', this.percentiles[selectedPlayerId]);
    if (this.chart) this.chart.destroy(); //makes it possible to resuse the canvas for new data
    Chart.register(ChartDataLabels);

    const data = [
      //Passing stats
      Math.round(this.percentiles[selectedPlayerId]['Key_Passes_Per_90']), 
      Math.round(this.percentiles[selectedPlayerId].Successful_Deliveries_Into_Box_Per_90),
      Math.round(this.percentiles[selectedPlayerId].Progressive_Passes_Per_90),
      Math.round(this.percentiles[selectedPlayerId].Pressured_Passes_Per_90),
      Math.round(this.percentiles[selectedPlayerId]['Pass_Completion_%']),

      //Defending stats
      Math.round(this.percentiles[selectedPlayerId].Dribbled_Past),
      Math.round(this.percentiles[selectedPlayerId]['Rate_Adj_Tackles_Won_%']),
      Math.round(this.percentiles[selectedPlayerId]['Pressure_Regain_%']),
      Math.round(this.percentiles[selectedPlayerId].Interceptions_Per_90),
      Math.round(this.percentiles[selectedPlayerId].Ball_recoveries_Per_90),
      Math.round(this.percentiles[selectedPlayerId]['Rate_Adj_Aerials_Won_%']),

      //Attacking stats
      Math.round(this.percentiles[selectedPlayerId].Netto_xA), 
      Math.round(this.percentiles[selectedPlayerId].xG_Per_Shot),
      Math.round(this.percentiles[selectedPlayerId].Non_Penalty_xA_xG_Per_90),
      Math.round(this.percentiles[selectedPlayerId].Non_Penalty_xG_Per_90),
      Math.round(this.percentiles[selectedPlayerId].xA_Per_90),
      Math.round(this.percentiles[selectedPlayerId].SCA_Per_90),
      Math.round(this.percentiles[selectedPlayerId].GCA_Per_90),

      //Possesion stats
      Math.round(this.percentiles[selectedPlayerId].Touches_in_Box), 
      Math.round(this.percentiles[selectedPlayerId].Final_Third_Entries),
      Math.round(this.percentiles[selectedPlayerId].Progressive_Distance_Per_Carry),
      Math.round(this.percentiles[selectedPlayerId].Rate_Adj_Successful_Dribbles_Per_90),
      Math.round(this.percentiles[selectedPlayerId].Turnovers_Per_90),
      Math.round(this.percentiles[selectedPlayerId].Rate_Adj_Target_of_an_Attempted_Pass)];

      const labels = [
        this.percentiles[selectedPlayerId].player,
        this.percentiles[selectedPlayerId].minutes,
      ]
    
    this.chart = new Chart('canvas', {
      type: 'polarArea',
      plugins: [ChartDataLabels],
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Rotelle',
            borderAlign: 'inner',
            data: data,
            backgroundColor: [
              //Gul - Passing
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              'rgb(255, 205, 86)',
              //Grønn - Defending
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              'rgb(75, 192, 192)',
              //Rød - Attacking
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              //Blå - Possesion
              'rgb(54, 162, 235)',
              'rgb(54, 162, 235)',
              'rgb(54, 162, 235)',
              'rgb(54, 162, 235)',
              'rgb(54, 162, 235)',
              'rgb(54, 162, 235)',
            ],
          },
        ],
      },
    }); 
  }  
}
