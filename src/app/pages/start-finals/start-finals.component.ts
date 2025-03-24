import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BattleCardComponent } from '../../components/battle-card/battle-card.component';
import { UserService } from '../../utils/services/user.service';
import { StartFinalsService } from './start-finals.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


interface Match {
  id: string;
  round: number;
  participant1: { _id: string; name: string; isBye: boolean; }
  ;
  participant2: { _id: string; name: string; isBye: boolean; }
  ;
  winner?: {
    _id: string;
    name: string;
  };
  isThirdPlaceMatch?:boolean;
}


@Component({
  selector: 'app-start-finals',
  imports: [HeaderComponent, FooterComponent, BattleCardComponent, CommonModule],
  templateUrl: './start-finals.component.html',
  styleUrl: './start-finals.component.css'
})
export class StartFinalsComponent {
  Participants: Match[] = [];

    constructor(private readonly startFinalsService: StartFinalsService, private readonly router: Router) { }

  ngOnInit() {
    this.startFinalsService.getBracket(this.getTournamentID()).then((data: any) => {
      console.log(data);


      if (data.matchlist && Array.isArray(data.matchlist)) {
        this.Participants = data.matchlist.filter((match: any) => {
          return match.participant1 && match.participant2 && !match.winner;
        });
        if (data.thirdplacematch.participant1 && data.thirdplacematch.participant2 && !data.thirdplacematch.winner) {

          this.Participants.push(data.thirdplacematch)
        }
      } else {
        this.Participants = []; // Si no hay matchlist, asigna un array vacío
      }

      if (data.top4) {
          this.router.navigate(['final-result'], {queryParams: {tournamentId: this.getTournamentID()}})
      }
      console.log(this.Participants);

    });
  }

  getTournamentID(): string {
    return new URLSearchParams(window.location.search).get('tournamentId') || '';
  }


  getRoundName(round: number, isThirdPlaceMatch = false): string {
    const roundNames = ['Cuartos de final', 'Semifinal', 'Final'];
    let ret = roundNames[round - roundNames.length + 2] || `Eliminatoria ${round}`;

    return isThirdPlaceMatch ? "Consolación" : ret   
  }



}
