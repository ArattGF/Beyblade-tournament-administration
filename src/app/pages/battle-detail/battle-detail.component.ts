import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleDetailService } from './battle-detail.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-battle-detail',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './battle-detail.component.html',
  styleUrl: './battle-detail.component.css'
})


export class BattleDetailComponent implements OnInit {

  setForm: FormGroup;
  group: any = {};
  match: any = {};
  gameSet: number = 1;
  
  

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
      if ( params['match']) {
      this.match._id = params['match'];
      this.setMatchData();
      } else {
      console.warn('No query parameters available.');
      }
    });
  }
  
  setMatchData(): void {
    this.battleDetailService.GetMatchDetails(this.match._id).then((data)=>{

      this.group = data.group;
      this.match = data.match;
      
    })
  }

  sendSet() {
    if (this.setForm.valid) {
      this.battleDetailService.EndSet(this.match._id, this.setForm.value).then((data: any) =>{
  
        const winner = this.match.participants.find((participant: any) => participant._id === data.addedSet.winner);
        console.log('Winner:', winner);
        HeaderComponent.showAlert(data.matchStatus === 'completed' ? `Ganador del match ${winner.name}` :`Ganador del set ${winner.name}`);
        this.setForm.reset();

        if (data.matchStatus === 'completed') {
      this.router.navigate(["group-stage"], {queryParams: { tournamentId: this.group.tournament._id}})
          
        }
        this.gameSet++;
      })
    }
    }
}

