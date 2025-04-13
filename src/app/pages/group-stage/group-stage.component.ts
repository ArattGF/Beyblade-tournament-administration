import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GroupStageService } from './group-stage.service';
import { findIndex } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-stage',
  imports: [HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './group-stage.component.html',
  styleUrl: './group-stage.component.css'
})
export class GroupStageComponent {




  battle: FormGroup;

  groups: any = []
  AParticipants: any = [];
  BParticipants: any = [];

  AParticipantSelected: any = {};
  BParticipantSelected: any = {};

  canChangeStage = false;

  tournamentID: string = '';
  inTransaction: boolean = false;


  constructor(
    private readonly fb: FormBuilder,
    private readonly groupStageService: GroupStageService,
    private readonly router: Router
  ) {
    this.battle = this.fb.group({
      group: ['', [Validators.required]],
      aParticipant: ['', [Validators.required]],
      bParticipant: ['', [Validators.required]]
    })

    
    groupStageService.GetAllTables().then(data => {

      console.log(data);
      
      this.groups = [];
      let changeStage = true
      this.tournamentID = data.tournamentId


      data.groups.forEach((group: any): void => {

        if ( !group.groupStageEnded) {
          changeStage = false
        }
        this.groups.push({ _id: group._id, name: group.name })

      });
      this.canChangeStage = changeStage
      

      if (data.tournamentStage === 'finals') {
        this.canChangeStage = true;
      }

    })  }



  resetParticipants() {
    this.groupStageService.GetAllParticipants(this.battle.value.group).then(data => {

      this.AParticipants = [];
      this.BParticipants = [];
      
      if (data.groupStageEnded) {
        this.groups = this.groups.filter((group: any) => group._id !== this.battle.value.group);
        this.battle.reset();
        if (this.groups.length === 0) {
          this.canChangeStage = true;
        }
      }


      data.participants.forEach((participant: any): void => {

        this.AParticipants.push({ _id: participant._id, name: participant.name })
        this.BParticipants.push({ _id: participant._id, name: participant.name })
      })
    })
  }

  replaceParticipant(participantNumber: number) {
    this.groupStageService.GetAvailableParticipants(this.battle.value.group, participantNumber === 1 ? this.battle.value.aParticipant: this.battle.value.bParticipant)
    .then(data =>{
      console.log(data);
      
      if(participantNumber == 1){
        this.BParticipants = data.participants;
      }else{
        this.AParticipants = data.participants;
      }
    })
  }


  startMatch() {
    this.groupStageService.StartMatch(this.battle.value).then((data: any)=>{
      console.log(data.match);
      
      HeaderComponent.showAlert(data.message);
      this.router.navigate(['/battle-detail'], {queryParams: {match: data.match}});   
    }).catch(err => {
      console.log(err);
      HeaderComponent.showAlert(err.error.message);
      
    })
  }


  startFinals() {
    this.inTransaction = true;
    this.groupStageService.startFinals(this.tournamentID).then((data: any)=>{
      console.log(data);
      
      HeaderComponent.showAlert(data.message);
      this.router.navigate(['/start-finals'], {queryParams: {tournamentId: this.tournamentID}});   
      this.inTransaction = false;
      
    }).
    catch(err => {
      console.log(err);
      HeaderComponent.showAlert(err.error.message);
      this.inTransaction = false;
    })

  }


}
