import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-points',
  imports: [],
  templateUrl: './confirm-points.component.html',
  styleUrl: './confirm-points.component.css'
})
export class ConfirmPointsComponent {
  @Input() participant1!: any;
  @Input() participant2!: any;
  @Input() set!: number;


  get nameOfParticipant1() : string { return this.participant1.name || "player"};
  get nameOfParticipant2(): string{ return this.participant2.name || "player"};
  get pointsOfParticipant1(): number  {return this.participant1.points || 0};
  get pointsOfParticipant2(): number  {return this.participant2.points || 0};
  get outSet(): number  {return this.set || 1 };



}
