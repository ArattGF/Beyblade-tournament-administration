import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { NewCompetitionService } from './new-competition.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-competition',
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './new-competition.component.html',
  styleUrl: './new-competition.component.css'
})
export class NewCompetitionComponent {
  tournament: any;

  constructor(private readonly competitionService: NewCompetitionService, private readonly router: Router) {
    this.tournament = {
      name: '',
      numberOfGroups: '',
      maxParticipantsPerGroup: ''
    }
  }


  CreateTournament(): void {


    this.competitionService.CreateTournament(this.tournament).then((data: any) => {

      console.log(data);
      HeaderComponent.showAlert(data.message, 'rgb(163, 245, 0)', 'black');

      // Redirect to the home page
      // this.router.navigate(['/new-competition'], { state: {message: data.message}  });
    }).catch((error: any) => {
      HeaderComponent.showAlert(error.error, 'rgb(205, 46, 25)', 'black');

    });

  }
}
