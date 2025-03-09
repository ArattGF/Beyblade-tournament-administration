import { Injectable } from '@angular/core';


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


  constructor() { }

  getUsers(): User[]{
    return this.users
  }
}
