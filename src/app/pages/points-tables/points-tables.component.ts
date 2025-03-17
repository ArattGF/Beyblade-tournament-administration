import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { PointsTablesService } from './points-tables.service';
import { SocketService } from '../../utils/services/socket.service';

@Component({
  selector: 'app-points-tables',
  imports: [FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './points-tables.component.html',
  styleUrl: './points-tables.component.css'
})
export class PointsTablesComponent implements OnInit, OnDestroy {

  tables: any = [];
  tournamentName: string = ''
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
      this.tables = data.groups;
      this.tournamentName = data.tournamentName
     
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
 