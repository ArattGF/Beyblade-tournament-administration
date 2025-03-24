import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinalResultService {


  apiUrl = environment.apiUrl + 'match/'
  constructor(
    private http: HttpClient
  ) { }


  gteTop4(tournamentId: string): Promise<any>{
    return this.http.get(this.apiUrl + 'top-4', {params: {tournamentId: tournamentId}}).toPromise()
  }
}
