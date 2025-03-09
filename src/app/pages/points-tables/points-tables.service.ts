import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PointsTablesService {

  groupApiUrl = environment.apiUrl + 'group/'

  constructor(private readonly http: HttpClient) { }

  GetAllTables() : Promise<any>{
    return this.http.get(this.groupApiUrl).toPromise();
  }
}
