import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-final-result',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './final-result.component.html',
  styleUrl: './final-result.component.css'
})
export class FinalResultComponent {
  constructor() { }
  
  ngOnInit() {
  }
}
