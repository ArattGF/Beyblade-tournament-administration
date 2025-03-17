import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FooterComponent, HeaderComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: any = {
    username: "",
    password: ""
  }; 


  constructor(private readonly router: Router, private readonly loginService: LoginService){
    this.user.username = "";
    this.user.password = "";
  }
  login(): void {

    let loggedUser = this.loginService.loginUser({user :  this.user.username, passwd : this.user.password});
    loggedUser.then((data: any) => {
      localStorage.setItem('bearerToken', data.token);
      localStorage.setItem('user', data.user.user);
      localStorage.setItem('isAdmin', data.user.IsAdmin);
      
      // Redirect to the home page
      this.router.navigate(['/new-competition'], { state: {message: data.message}  });
    }).catch((error: any) => {
      console.error('Error:', error);
    });
  }
}
