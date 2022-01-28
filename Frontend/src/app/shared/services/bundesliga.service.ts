import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:5000/'; // add this to an environment config file

@Injectable({
  providedIn: 'root'
})

export class BundesligaService {

  private bundesliga = 'bundesliga';
  //private bundesligaId = 'bundesliga?id';

  constructor(private http:HttpClient) { }

  getPlayers(): Observable<any> {
    return this.http.get(`${BASE_URL}${this.bundesliga}`);
  }

  /* getPlayerById(): Observable<any> {
    let params1 = new HttpParams().set(':id', 1);

    return this.http.get("http://localhost:5000/bundesliga", {params:params1});
  } */
}
