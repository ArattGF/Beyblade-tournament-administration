import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserCardComponent } from '../../components/user-card/user-card.component';

import { CommonModule } from '@angular/common';
import { VerifyCombatService } from './verify-combat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-combat',
  imports: [HeaderComponent, FooterComponent, UserCardComponent, CommonModule],
  templateUrl: './verify-combat.component.html',
  styleUrl: './verify-combat.component.css'
})
export class VerifyCombatComponent {



  participant1: any = {};
  participant2: any = {};

  matchId = ''
  constructor(
    private readonly verifyCombatService: VerifyCombatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  get participant1Object(): any{
    return this.participant1
  }

  
  get participant2Object(): any{
    return this.participant2
  }


  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.matchId = params.get('m') || '';

      if (this.matchId) {
        this.verifyCombatService.getMatchInfo(this.matchId).then((data: any)=>{
          console.log(data);
          this.participant1 = data.participant1;
          this.participant2 = data.participant2;
          
        })
      }
      
    });
  }

  StartCombat() {

    this.router.navigate(['battle-detail'], {queryParams: {match: this.matchId, final: true}})
    }
}
 