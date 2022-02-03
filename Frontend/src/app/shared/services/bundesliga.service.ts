import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Percentiles } from 'src/app/interfaces/percentiles';
import { PercentilesId } from 'src/app/interfaces/percentilesId';

const BASE_URL = 'http://localhost:5000/'; // add this to an environment config file

@Injectable({
  providedIn: 'root',
})
export class BundesligaService {
  private bundesliga = 'bundesliga';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Percentiles[]> {
    return this.http.get<Percentiles[]>(`${BASE_URL}${this.bundesliga}`);
  }

  getPlayerById(selectedPlayerId: string): Observable<PercentilesId> {
    return this.http.get<PercentilesId>(
      'http://localhost:5000/bundesliga/' + selectedPlayerId
    );
  }
}
