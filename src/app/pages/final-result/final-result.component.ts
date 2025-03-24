import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import {UserService } from '../../utils/services/user.service';
import { CommonModule } from '@angular/common';
import { FinalResultService } from './final-result.service';
@Component({
  selector: 'app-final-result',
  imports: [HeaderComponent, FooterComponent, UserCardComponent, CommonModule],
  templateUrl: './final-result.component.html',
  styleUrl: './final-result.component.css'
})
export class FinalResultComponent {


  first: any = {}
  second: any = {}
  third: any = {}
  fourth: any = {}

  constructor(private finalResultService: FinalResultService) {}
  ngOnInit() {
    this.finalResultService.gteTop4(this.getTournamentID()).then((data: any)=>{
      console.log(data);
      this.first =data.top4.first;     
      this.second =data.top4.second;
      this.third =data.top4.third;
      this.fourth =data.top4.fourth;
    })
  }

  getTournamentID(): string {
    return new URLSearchParams(window.location.search).get('tournamentId') || '';
  }
}
 