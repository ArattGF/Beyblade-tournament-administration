import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupStageService {


  groupApiUrl: string = environment.apiUrl + "group/"
  matchApiUrl: string = environment.apiUrl + "match/"
  participantApiUrl: string = environment.apiUrl + "participant/"

  constructor(private readonly http: HttpClient) { }

  GetAllTables(): Promise<any> {
    return this.http.get(this.groupApiUrl).toPromise();
  }

  GetAllParticipants(groupID: string): Promise<any> {
    return this.http.get(this.participantApiUrl, { params: { groupID: groupID } }).toPromise()
  }

  GetAvailableParticipants(groupID: string, participantID: string): Promise<any> {
    console.log(groupID, participantID);

    return this.http.get(this.matchApiUrl + 'participants-availables', { params: { groupId: groupID, participantId: participantID } }).toPromise()
  }

  StartMatch(battle: any): Promise<any> {
    return this.http.post(this.matchApiUrl + 'start', { participants: [battle.aParticipant, battle.bParticipant] },
      { params: { groupId: battle.group } }).toPromise()
  }
}
