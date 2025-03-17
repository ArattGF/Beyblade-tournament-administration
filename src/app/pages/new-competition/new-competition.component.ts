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
export class NewCompetitionComponent implements OnInit {
  tournament: any;

  constructor(private readonly competitionService: NewCompetitionService, private readonly router: Router) {
    this.tournament = {
      name: '',
      numberOfGroups: '',
      maxParticipantsPerGroup: ''
    }


  } 

  ngOnInit(): void {
    this.competitionService.GetCurrentTournament().then(data => {
      if (data.tournament._id) {

        HeaderComponent.showAlert(data.message, 'rgb(163, 245, 0)', 'black');

        this.RedirectPage(data.tournament);

      }
    })
  }

  CreateTournament(): void {
    this.competitionService.CreateTournament(this.tournament).then((dataTournament: any) => {
      HeaderComponent.showAlert(dataTournament.message, 'rgb(163, 245, 0)', 'black');
      this.competitionService.CreateGroups(dataTournament.tournamentID).then((dataGroup: any) => {
        HeaderComponent.showAlert(dataGroup.message, 'rgb(163, 245, 0)', 'black');
        this.router.navigate(['/register'], { queryParams: { tournamentId: dataGroup.tournamentID } });
      }
      ).catch((error: any) => {
        HeaderComponent.showAlert(error.error, 'rgb(205, 46, 25)', 'black');
      });
    }).catch((error: any) => {
      HeaderComponent.showAlert(error.error, 'rgb(205, 46, 25)', 'black');

    });

  }

  RedirectPage(data: any): void {

    let routeToRedirect = "/";
    switch (data.status) {
      case 'registration':
        routeToRedirect = "register"
        break;
      case "group":
        routeToRedirect = "group-stage"
        break;

      case 'finals':
        routeToRedirect = "start-finals"
        break;
      default:
        break;
    };
    if (routeToRedirect != '/') {
      
      this.router.navigate([routeToRedirect], { queryParams: { tournamentId: data._id } });
    }else{
      HeaderComponent.showAlert("Ha sucedido un error.", "red", "black")
    }

  }
} 
