import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewCompetitionService{

  apiUrl = environment.apiUrl + "tournament/"
 constructor(private readonly http: HttpClient){}
 
 
 CreateTournament(tournamentData: { name: string, numberOfGroups: number, maxParticipantsPerGroup: number }): Promise<any> {
  return this.http.post(this.apiUrl + 'create', tournamentData).toPromise()
    .catch(error => {
      console.error('There was a problem with the HTTP request:', error);
      throw error;
    });
 }
//  CreateTournament(tournamentData: {name: string, numberOfGroups: number, maxParticipantsPerGroup: number}): Promise<any> {
//    return fetch(this.apiUrl + 'create', {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify(tournamentData)
//    })
//    .then(response => {
//     console.log(response);
//      if (!response.ok) {
//        throw new Error('Network response was not ok');
//      }
//      return response.json();
//    })
//    .catch(error => {
//      console.error('There was a problem with the fetch operation:', error);
//      throw error;
//    });

//   }
}
