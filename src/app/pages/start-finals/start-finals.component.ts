import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BattleCardComponent } from '../../components/battle-card/battle-card.component';
import { User, UserService } from '../../utils/services/user.service';



@Component({
  selector: 'app-start-finals',
  imports: [HeaderComponent, FooterComponent, BattleCardComponent],
  templateUrl: './start-finals.component.html',
  styleUrl: './start-finals.component.css'
})
export class StartFinalsComponent {
  Users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.Users = this.userService.getUsers();
  }
}
