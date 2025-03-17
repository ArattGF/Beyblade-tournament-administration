import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


export interface User{
  id: number;
  name: string;
  points: number;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
private users: User[]=[
  {id: 1, name:'Aratt Gaytan', points: 27},
  {id: 2, name:'Rafael Gallegos', points: 28 },
  {id: 3, name:'Angel Guerrero', points: 29 },
  {id: 4, name:'Hatsune', points: 30},
  {id: 5, name:'Godzilla', points: 31},
]

  constructor(private readonly http: HttpClient) { }

  getUsers(): User[]{
    return this.users
  }


  checkToken(): Promise<any>{
    return this.http.get(environment.apiUrl).toPromise()

  }

}
