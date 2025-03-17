import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  apiParticipantUrl = environment.apiUrl + 'participant/';
  apiTournamentUrl = environment.apiUrl + 'tournament/';

  constructor(private readonly http: HttpClient) { }

  CreateParticipant(participantData: {name: string, region: string, tournamentID: string}): Promise<any>{
    return this.http.post(this.apiParticipantUrl + 'create', participantData).toPromise()
    .catch(error =>{
      throw error;
    });
  }

  StartGroupStage(tournamentID: string): Promise<any>{
    return this.http.post(this.apiTournamentUrl + 'start', {tournamentID: tournamentID}, {params: { stage: 'group'}}).toPromise()
    .catch(error =>{
      throw error;
    });
  }

}
 