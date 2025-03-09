import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-points-tables',
  imports: [FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './points-tables.component.html',
  styleUrl: './points-tables.component.css'
})
export class PointsTablesComponent {

}
