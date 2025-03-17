import { Component, Input } from '@angular/core';
import { User } from '../../utils/services/user.service';


@Component({
  selector: 'app-battle-card',
  imports: [],
  templateUrl: './battle-card.component.html',
  styleUrl: './battle-card.component.css'
})
export class BattleCardComponent {
  @Input() user1!: User;
  @Input() user2!: User;
  

}
