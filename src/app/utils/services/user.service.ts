import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private readonly apiUrl = environment.apiUrl;
  
  constructor(private readonly http: HttpClient) { }


  checkToken(): Promise<any>{
    return this.http.get(environment.apiUrl).toPromise()
  }

  

}
