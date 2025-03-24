import { APP_BOOTSTRAP_LISTENER, Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { PointsTablesService } from './points-tables.service';
import { SocketService } from '../../utils/services/socket.service';
import { BracketComponent } from "../../components/bracket/component/bracket/bracket.component";

@Component({
  selector: 'app-points-tables',
  imports: [FooterComponent, HeaderComponent, CommonModule, BracketComponent],
  templateUrl: './points-tables.component.html',
  styleUrl: './points-tables.component.css'
})
export class PointsTablesComponent implements OnInit, OnDestroy {

  tables: any = [];
  tournamentName: string = ''
  tournamentID: string = ''

  infinals: boolean = false;

  participants: any[] = []

constructor(
  private readonly pointsTablesService: PointsTablesService,
  private readonly socketService: SocketService){}
  ngOnInit(): void {
    this.LoadData();
    this.listenForUpdates();

  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  LoadData(): void{
    this.pointsTablesService.GetAllTables().then(data =>{
      console.log(data);
      
      this.tables = data.groups;
      this.tournamentName = data.tournamentName
      this.tournamentID = data.tournamentId
      this.infinals = data.tournamentStage === 'finals'

      
      this.pointsTablesService.getWinners(this.tournamentID).then((data: any)=>{
        console.log(data);
        
        let i = 1;
        data.groups.forEach( (group: any) => {
          group.seed = i;
          i++; 
        });
        
        this.participants = data.groups;


        
      });

     }).catch(error =>{
      console.log(error);
     });
  }
  private listenForUpdates() {
    this.socketService.onPlayersUpdate((playerUpdate) => {
      this.LoadData()
      // this.tournamentName = playerUpdate.tournamentName
    });
    this.socketService.onSetsUpdate((groupUpdated) =>{

      const groupIndex = this.tables.findIndex((group: any) => group.name === groupUpdated.name);
      if (groupIndex !== -1) {
        this.tables[groupIndex].participants = groupUpdated.participants;
      }
    })
  }


}
 