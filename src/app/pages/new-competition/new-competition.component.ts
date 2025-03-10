import { Component, OnInit } from '@angular/core';
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
export class NewCompetitionComponent implements OnInit{
  tournament: any;

  constructor(private readonly competitionService: NewCompetitionService, private readonly router: Router) {
    this.tournament = {
      name: '',
      numberOfGroups: '',
      maxParticipantsPerGroup: ''
    }

    
  }

  ngOnInit(): void {
    this.competitionService.GetCurrentTournament().then(data=>{
      if (data.tournament._id) {
      HeaderComponent.showAlert(data.message, 'rgb(163, 245, 0)', 'black');
      this.router.navigate(['/register'], {queryParams: {tournamentId: data.tournament._id}});
        
      }
    })
  }

  CreateTournament(): void {
    this.competitionService.CreateTournament(this.tournament).then((dataTournament: any) => {
      HeaderComponent.showAlert(dataTournament.message, 'rgb(163, 245, 0)', 'black');
      this.competitionService.CreateGroups(dataTournament.tournamentID).then((dataGroup: any) => {
        HeaderComponent.showAlert(dataGroup.message, 'rgb(163, 245, 0)', 'black');
        this.router.navigate(['/register'], {queryParams: {tournamentId: dataGroup.tournamentID}});
      }
      ).catch((error: any) => {
        HeaderComponent.showAlert(error.error, 'rgb(205, 46, 25)', 'black');
      });
    }).catch((error: any) => {
      HeaderComponent.showAlert(error.error, 'rgb(205, 46, 25)', 'black');

    }); 

  }
} 
