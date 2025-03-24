import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BracketService {

  matchApiUrl = environment.apiUrl + 'match/'
  constructor(
    private readonly http: HttpClient
  ) { }

  getBracket(tournamentId: string): Promise<any>{
    return this.http.get(this.matchApiUrl + tournamentId + '/bracket').toPromise();
  }
}
