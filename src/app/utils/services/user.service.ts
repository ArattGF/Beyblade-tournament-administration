import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private readonly http: HttpClient) { }


  checkToken(): Promise<any>{
    return this.http.get(environment.apiUrl).toPromise()
  }

  

}
