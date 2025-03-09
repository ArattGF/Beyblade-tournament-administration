import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  apiUrl = environment.apiUrl + 'participant/';

  constructor(private readonly http: HttpClient) { }



  CreateParticipant(participantData: {name: string, region: string, tournamentID: string}): Promise<any>{
    return this.http.post(this.apiUrl + 'create', participantData).toPromise()
    .catch(error =>{
      throw error;
    });
  }

}
 