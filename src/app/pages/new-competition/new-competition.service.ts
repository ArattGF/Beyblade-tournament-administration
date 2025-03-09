import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewCompetitionService{

  apiUrlTournament = environment.apiUrl + "tournament/"
  apiUrlGroup = environment.apiUrl + "group/"
 constructor(private readonly http: HttpClient){}
 

 GetCurrentTournament(): Promise<any> {
  return this.http.get(this.apiUrlTournament).toPromise()
    .catch(error => {
      // console.error('There was a problem with the HTTP request:', error);
      throw error;
    });
 }


 CreateTournament(tournamentData: { name: string, numberOfGroups: number, maxParticipantsPerGroup: number }): Promise<any> {
  return this.http.post(this.apiUrlTournament + 'create', tournamentData).toPromise()
    .catch(error => {
      // console.error('There was a problem with the HTTP request:', error);
      throw error;
    });
 }

CreateGroups(tournamentID: number): Promise<any> {
  return this.http.post(this.apiUrlGroup + 'create', {tournamentID}).toPromise()
    .catch(error => {
      // console.error('There was a problem with the HTTP request:', error);
      throw error;
    });
  }




}
 