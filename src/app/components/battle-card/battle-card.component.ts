import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


interface participant{
  _id: string;
  name: string;
  isBye: boolean;
}
@Component({
  selector: 'app-battle-card',
  imports: [],
  templateUrl: './battle-card.component.html',
  styleUrl: './battle-card.component.css'
})
export class BattleCardComponent {
  @Input() user1!: participant;
  @Input() user2!: participant;
  @Input() match!: string;
  @Input() round!: string;


  constructor(
    private readonly router: Router
  ){}

  
  get user1Name(): string {
    return this.user1?.name || 'Desconocido';
  }

  get user2Name(): string {
    return this.user2?.name || 'Desconocido';
  }
  get roundName():string{
    return this.round;
  }

  get getMatch():string{
    return this.match;
  }


  checkBattle():void{
    this.router.navigate(['verify-combat'], {queryParams: {m: this.getMatch}})
  }
  
}
 