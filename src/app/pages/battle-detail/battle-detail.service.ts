import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BattleDetailService {

  matchApiUrl = environment.apiUrl + 'match/'
  constructor(private readonly http: HttpClient) { }


  GetMatchDetails(matchID: string, finals: boolean): Promise<any>{

    if (finals) {
      
      return this.http.get(this.matchApiUrl + 'finals/', {params: {matchId: matchID}}).toPromise()
    } else {
      return this.http.get(this.matchApiUrl, {params: {matchId: matchID}}).toPromise()
      
    }
  }

  EndSet(matchID: string, points:any, finals: boolean): Promise<any>{

    if (finals) {
      
      return this.http.put(this.matchApiUrl + 'finals/end-set', points, {params: {matchId: matchID}}).toPromise();
    }
    return this.http.put(this.matchApiUrl + 'end-set', points, {params: {matchId: matchID}}).toPromise();
  }
}
