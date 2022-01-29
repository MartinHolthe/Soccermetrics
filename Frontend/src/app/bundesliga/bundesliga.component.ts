import { Component, OnInit } from '@angular/core';
import { BundesligaService } from '../shared/services/bundesliga.service';
import { Percentiles } from '../interfaces/percentiles';
import { PercentilesId } from '../interfaces/percentilesId';

@Component({
  selector: 'app-bundesliga',
  templateUrl: './bundesliga.component.html',
  styleUrls: ['./bundesliga.component.scss']
})
export class BundesligaComponent implements OnInit {
  
  constructor(private bundesligaService: BundesligaService) { }

  percentiles: Percentiles[] = [];
  PlayerSelected:Number | undefined;
  percentilesId: PercentilesId | undefined;
  

  ngOnInit(): void {
    this.bundesligaService.getPlayers()
    .subscribe
    ( 
      result =>
      {
        console.log('getPlayers succeded', result)
        this.percentiles = result;
      })
  }
  
  onPlayerSelected(selectedPlayerId:string): void{
    this.bundesligaService.getPlayerById(selectedPlayerId)
    .subscribe
    (
      result =>
      {
        console.log('getPlayerById succeded', result)
        this.percentilesId = result;
      }
    )
  }
}
