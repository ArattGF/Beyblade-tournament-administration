import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PointsTablesService {

  groupApiUrl = environment.apiUrl + 'group/'
  tournamnetapiUrl: string = environment.apiUrl + 'participant/'

  constructor(private readonly http: HttpClient) { }

  GetAllTables() : Promise<any>{
    return this.http.get(this.groupApiUrl).toPromise();
  }


 getWinners(tournamentId: string): Promise<any>{
  return this.http.get(this.tournamnetapiUrl + 'winners' ,{params: {tournamentId}}).toPromise()

 } 


}
