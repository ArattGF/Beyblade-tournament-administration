import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { User, UserService } from '../../utils/services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-final-result',
  imports: [HeaderComponent, FooterComponent, UserCardComponent, CommonModule],
  templateUrl: './final-result.component.html',
  styleUrl: './final-result.component.css'
})
export class FinalResultComponent {
  Users: User[]=[];

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.Users = this.userService.getUsers();
  }
}
 