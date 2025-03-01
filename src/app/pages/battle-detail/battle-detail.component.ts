import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-battle-detail',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './battle-detail.component.html',
  styleUrl: './battle-detail.component.css'
})
export class BattleDetailComponent {
  group: string = 'B'; 
  gameSet: number = 2; 
}
