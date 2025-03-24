import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyCombatService {

  matchApiUrl = environment.apiUrl +'match/'
  constructor(
    private readonly http: HttpClient
  ) { }


  getMatchInfo(matchId: string): Promise<any>{
    return this.http.get(this.matchApiUrl + 'finals/', {params: {matchId: matchId} }).toPromise()
  }

  
}
