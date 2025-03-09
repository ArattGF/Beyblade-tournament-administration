import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  message:string;
  constructor(private readonly router: Router) { 
    this.message = this.getNavigationState()
    
  }
  ngOnInit():void{
    if(this.message){
      HeaderComponent.showAlert(this.message);
    }

  }
  getNavigationState(): string {
    let navigation = this.router.getCurrentNavigation();
    let message = navigation?.extras?.state?.["message"] ?? "";
    return message;
  }

  static showAlert(message: string, backColor: string = 'rgb(0, 189, 223)', color: string = 'black'): void {
    const alertDiv = document.createElement('div');
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
    alertDiv.className = 'alert';
    alertDiv.textContent = message;
    alertDiv.style.backgroundColor = backColor;
    alertDiv.style.color = color
    alertDiv.style.width = '100%';
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '-50px';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translateX(-50%)';
    alertDiv.style.transition = 'top 0.5s ease-in-out';
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.style.top = '20px';
    }, 0);
    setTimeout(() => {
      alertDiv.style.top = '-50px';
    }, 2500);
  }
}
