import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { User, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-combat',
  imports: [HeaderComponent, FooterComponent, UserCardComponent],
  templateUrl: './verify-combat.component.html',
  styleUrl: './verify-combat.component.css'
})
export class VerifyCombatComponent {

  Users: User[]=[];
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.Users = this.userService.getUsers();
  }

}
