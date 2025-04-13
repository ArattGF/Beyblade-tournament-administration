import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleDetailService } from './battle-detail.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmPointsComponent } from "../../components/confirm-points/confirm-points.component";


@Component({
  selector: 'app-battle-detail',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule, ConfirmPointsComponent],
  templateUrl: './battle-detail.component.html',
  styleUrl: './battle-detail.component.css'
})


export class BattleDetailComponent implements OnInit {

  setForm: FormGroup;
  group: any = {};
  match: any = {};
  gameSet: number = 1;
  finals: boolean = false;



  constructor(
    private router: Router,
    private readonly battleDetailService: BattleDetailService,
    private readonly fb: FormBuilder) {

    this.setForm = fb.group({

    })
    this.setForm = fb.group({
      participant1Points: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      participant2Points: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    this.router.routerState.root.queryParams.subscribe(params => {
      console.log(params);

      if (params['final']) {
        this.finals = params['final'];
      }
      if (params['match']) {
        this.match._id = params['match'];
        this.setMatchData();
      } else {
        console.warn('No query parameters available.');
      }
    });
  }


  get participant1Name(): string {
    if (this.finals) {
      return this.match.participant1.name
    }
    return this.match.participants[0].name
  }


  get inFinals(): boolean {
    return this.finals
  }




  get participant2Name(): string {
    if (this.finals) {
      return this.match.participant2.name
    }
    return this.match.participants[1].name
  }


  get participant1ForConfirm(): any {
    let participant: any = {}
    if (this.finals) {
      participant.name = this.match.participant1.name
    }else{
      
      participant.name =this.match.participants[0].name
    }

    participant.points = this.setForm.value.participant1Points

    return participant
  }
  get participant2ForConfirm(): any {
    let participant: any = {}
    if (this.finals) {
      participant.name = this.match.participant2.name
    }
    else{
      participant.name = this.match.participants[1].name
    }

    participant.points = this.setForm.value.participant2Points

    return participant
  }


  setMatchData(): void {
    this.battleDetailService.GetMatchDetails(this.match._id, this.finals).then((data) => {

      console.log(data);

      if (this.finals) {
        this.match = data


      } else {
        this.group = data.group;
        this.match = data.match;

      }


      console.log(this.match);

    })
  }

  sendSet() {
    if (this.setForm.valid) {
      this.battleDetailService.EndSet(!this.inFinals ? this.match._id : this.match.id, this.setForm.value, this.inFinals).then((data: any) => {
        console.log(data);
  
        // Obtener el ganador del set
        let winner;
        if (this.inFinals) {
          // Para finales, los participantes están en participant1 y participant2
          winner = data.addedSet.winner._id === this.match.participant1._id ? this.match.participant1 : this.match.participant2;
        } else {
          // Para no finales, los participantes están en participants
          winner = this.match.participants.find((participant: any) => participant._id === data.addedSet.winner);
        }
  
       

        console.log('Winner:', winner);
        
        // Mostrar alerta
        HeaderComponent.showAlert(data.matchStatus === 'completed' ? `Ganador del match ${winner.name}` : `Ganador del set ${winner.name}`);
        this.setForm.reset();
  
        // Redirigir si el match está completado
        if (data.matchStatus === 'completed') {
          if (!this.inFinals) {
            this.router.navigate(["group-stage"], { queryParams: { tournamentId: this.group.tournament._id } });
          } else {
            this.router.navigate(['start-finals'], { queryParams: { tournamentId: this.match.tournamentId } });
          }
        }
  
        this.gameSet++;
      }).catch((error) => {
        console.error('Error al enviar el set:', error);
        HeaderComponent.showAlert('Error al enviar el set. Inténtalo de nuevo.');
      });
    }
  }



  getRoundName(round: number): string {
    const roundNames = ['Cuartos de final', 'Semifinal', 'Final'];
    return roundNames[round - roundNames.length + 2] || `Eliminatoria ${round}`;
  }

}

