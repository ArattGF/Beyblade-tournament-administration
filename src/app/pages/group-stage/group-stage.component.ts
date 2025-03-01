import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-group-stage',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './group-stage.component.html',
  styleUrl: './group-stage.component.css'
})
export class GroupStageComponent {

}
