import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BattleDetailService {

  matchApiUrl = environment.apiUrl + 'match/'
  constructor(private readonly http: HttpClient) { }


  GetMatchDetails(matchID: string): Promise<any>{
    return this.http.get(this.matchApiUrl, {params: {matchId: matchID}}).toPromise()
  }

  EndSet(matchID: string, points:any): Promise<any>{
    return this.http.put(this.matchApiUrl + 'end-set', points, {params: {matchId: matchID}}).toPromise();
  }
}
