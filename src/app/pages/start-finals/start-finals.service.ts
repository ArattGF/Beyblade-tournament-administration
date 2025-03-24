import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StartFinalsService {

  apiUrl: string = environment.apiUrl + 'participant/'
  matchApiUrl: string = environment.apiUrl + 'match/'
  constructor(private readonly http: HttpClient ) { }

 getWinners(tournamentId: string): Promise<any>{
  return this.http.get(this.apiUrl + 'winners' ,{params: {tournamentId}}).toPromise()

 } 

 
 getBracket(tournamentId: string): Promise<any>{
  return this.http.get(this.matchApiUrl + tournamentId +'/bracket').toPromise()

 } 

}
 