import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { PointsTablesService } from './points-tables.service';

@Component({
  selector: 'app-points-tables',
  imports: [FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './points-tables.component.html',
  styleUrl: './points-tables.component.css'
})
export class PointsTablesComponent implements OnInit {

  tables: any = [];
  tournamentName: string = ''
constructor(private readonly pointsTablesService: PointsTablesService){}
  ngOnInit(): void {
     this.pointsTablesService.GetAllTables().then(data =>{
      this.tables = data.groups;
      this.tournamentName = data.tournamentName
     console.log(data);
      
     }).catch(error =>{
      console.log(error);
      
     });
  }
}
 