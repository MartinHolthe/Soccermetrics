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
    this.chart.update();
  }
  
  updateChart(){
  chart.data.dataset[0].data = [
              //Passing stats
              this.percentiles[selectedPlayerId]['Key_Passes_Per_90'], //How to parse this to string
              this.percentiles[selectedPlayerId].Successful_Deliveries_Into_Box_Per_90,
              this.percentiles[selectedPlayerId].Progressive_Passes_Per_90,
              this.percentiles[selectedPlayerId].Pressured_Passes_Per_90,
              this.percentiles[selectedPlayerId]['Pass_Completion_%'],

              //Defending stats 
              this.percentiles[selectedPlayerId].Dribbled_Past, //How to parse this to string
              this.percentiles[selectedPlayerId]['Rate_Adj_Tackles_Won_%'],
              this.percentiles[selectedPlayerId]['Pressure_Regain_%'],
              this.percentiles[selectedPlayerId].Interceptions_Per_90,
              this.percentiles[selectedPlayerId].Ball_recoveries_Per_90,
              this.percentiles[selectedPlayerId]['Rate_Adj_Aerials_Won_%'],

              //Attacking stats 
              this.percentiles[selectedPlayerId].Netto_xA, //How to parse this to string
              this.percentiles[selectedPlayerId].xG_Per_Shot,
              this.percentiles[selectedPlayerId].Non_Penalty_xA_xG_Per_90,
              this.percentiles[selectedPlayerId].Non_Penalty_xG_Per_90,
              this.percentiles[selectedPlayerId].xA_Per_90,
              this.percentiles[selectedPlayerId].SCA_Per_90,
              this.percentiles[selectedPlayerId].GCA_Per_90,

              //Possesion stats 
              this.percentiles[selectedPlayerId].Touches_in_Box, //How to parse this to string
              this.percentiles[selectedPlayerId].Final_Third_Entries,
              this.percentiles[selectedPlayerId].Progressive_Distance_Per_Carry,
              this.percentiles[selectedPlayerId].Rate_Adj_Successful_Dribbles_Per_90,
              this.percentiles[selectedPlayerId].Turnovers_Per_90,
              this.percentiles[selectedPlayerId].Rate_Adj_Target_of_an_Attempted_Pass
            ];
    chart.update();
  }

  onPlayerSelected(selectedPlayerId: number): void {
    console.log('Selected player: ', this.percentiles[selectedPlayerId]);

    this.chart = new Chart('canvas', {
      type: 'polarArea',

      data: {
        labels: [this.percentiles[selectedPlayerId].player,this.percentiles[selectedPlayerId].minutes],
        datasets: [
          {
            label: 'Rotelle',
            data: [
              //Passing stats
              this.percentiles[selectedPlayerId]['Key_Passes_Per_90'], //How to parse this to string
              this.percentiles[selectedPlayerId].Successful_Deliveries_Into_Box_Per_90,
              this.percentiles[selectedPlayerId].Progressive_Passes_Per_90,
              this.percentiles[selectedPlayerId].Pressured_Passes_Per_90,
              this.percentiles[selectedPlayerId]['Pass_Completion_%'],

              //Defending stats 
              this.percentiles[selectedPlayerId].Dribbled_Past, //How to parse this to string
              this.percentiles[selectedPlayerId]['Rate_Adj_Tackles_Won_%'],
              this.percentiles[selectedPlayerId]['Pressure_Regain_%'],
              this.percentiles[selectedPlayerId].Interceptions_Per_90,
              this.percentiles[selectedPlayerId].Ball_recoveries_Per_90,
              this.percentiles[selectedPlayerId]['Rate_Adj_Aerials_Won_%'],

              //Attacking stats 
              this.percentiles[selectedPlayerId].Netto_xA, //How to parse this to string
              this.percentiles[selectedPlayerId].xG_Per_Shot,
              this.percentiles[selectedPlayerId].Non_Penalty_xA_xG_Per_90,
              this.percentiles[selectedPlayerId].Non_Penalty_xG_Per_90,
              this.percentiles[selectedPlayerId].xA_Per_90,
              this.percentiles[selectedPlayerId].SCA_Per_90,
              this.percentiles[selectedPlayerId].GCA_Per_90,

              //Possesion stats 
              this.percentiles[selectedPlayerId].Touches_in_Box, //How to parse this to string
              this.percentiles[selectedPlayerId].Final_Third_Entries,
              this.percentiles[selectedPlayerId].Progressive_Distance_Per_Carry,
              this.percentiles[selectedPlayerId].Rate_Adj_Successful_Dribbles_Per_90,
              this.percentiles[selectedPlayerId].Turnovers_Per_90,
              this.percentiles[selectedPlayerId].Rate_Adj_Target_of_an_Attempted_Pass
            ],
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
              'rgb(54, 162, 235)'
              
            ],
          },
        ],
      },
    });
  }
}
