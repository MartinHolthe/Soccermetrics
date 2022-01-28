import { Component, OnInit } from '@angular/core';
import { BundesligaService } from '../shared/services/bundesliga.service';
import { Players } from '../interfaces/players';
import { Player } from '../interfaces/player';


@Component({
  selector: 'app-rotelle',
  templateUrl: './rotelle.component.html',
  styleUrls: ['./rotelle.component.scss']
})
export class RotelleComponent implements OnInit {
  
  players: Players[] = [];
  //player: Player[] = [];
  
  constructor(private bundesligaService: BundesligaService) { }

  ngOnInit(): void {
    this.bundesligaService.getPlayers()
    .subscribe
    ( 
      result =>
      {
        this.players = result;
      })

      /* this.bundesligaService.getPlayerById()
      .subscribe
      ( 
        result =>
        {
          this.player = result;
        }) */
  }
}
