import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-new-competition',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './new-competition.component.html',
  styleUrl: './new-competition.component.css'
})
export class NewCompetitionComponent {

}
