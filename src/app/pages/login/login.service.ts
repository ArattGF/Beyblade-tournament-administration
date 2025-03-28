import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HeaderComponent } from '../../components/header/header.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.apiUrl + "admin/";

  constructor() { }

  loginUser(userData: { user: string, passwd: string }): Promise<any> {
    return fetch(this.apiUrl + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {

      if (!response.ok) {
        HeaderComponent.showAlert("Credenciales invalidas.", "red", "black")
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    });
  }

}
