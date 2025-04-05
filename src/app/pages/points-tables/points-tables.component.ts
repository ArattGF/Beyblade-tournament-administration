import { AfterViewInit, APP_BOOTSTRAP_LISTENER, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class PointsTablesComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild('finalsBracket') finalsBracket!: ElementRef;
  
  tables: any = [];
  filteredTables: any = [];
  selectedTables: Set<string> = new Set();

  tournamentName: string = ''
  tournamentID: string = ''

  infinals: boolean = false;

  participants: any[] = []

  private scrollInterval: any;

  


constructor(
  private readonly pointsTablesService: PointsTablesService,
  private readonly socketService: SocketService){}
  ngOnInit(): void {
    this.LoadData();
    this.listenForUpdates();

  }

  ngOnDestroy() {
    this.socketService.disconnect();
    this.stopAutoScroll();
  }

  ngAfterViewInit(): void {    
    if (this.tableContainer) {
    this.startAutoScroll();
    } else {
        console.error('tableContainer no está definido.');
    }
  }


  private startAutoScroll(): void {
    if (!this.tableContainer) {
        console.error('tableContainer no está disponible.');
        return;
    }

    const container = this.tableContainer.nativeElement;

    // Verificar si la pantalla es grande (mínimo 992px de ancho)
    if (window.innerWidth >= 992 ) {
        this.scrollInterval = setInterval(() => {
            container.scrollTop += 10; // Ajustar la velocidad del scroll aquí

            // Si se llega al final, volver al inicio
            if (container.scrollTop + container.clientHeight >= (container.scrollHeight + this.finalsBracket.nativeElement.clientHeight)) {
                container.scrollTop = 0; // Reiniciar al inicio
            }
        }, 3); // Ajustar el intervalo del scroll aquí
    }
}

  private stopAutoScroll(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }


  LoadData(): void{
    this.pointsTablesService.GetAllTables().then(data =>{
      console.log(data);
      
      data.groups.forEach((group: any) => {
        group.fav = false;
      })
      
  
      this.tables = data.groups;
      this.tournamentName = data.tournamentName
      this.tournamentID = data.tournamentId
      this.infinals = data.tournamentStage === 'finals'

      this.filteredTables = [...this.tables]; // Inicialmente mostrar todas las tablas
       
      
      this.pointsTablesService.getWinners(this.tournamentID).then((data: any)=>{

        
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

  toggleTableFilter(tableName: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
        this.selectedTables.add(tableName);
    } else {
        this.selectedTables.delete(tableName);
    }
}

updateSelectedTables(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);

  this.selectedTables = new Set(selectedOptions);
}

applyFilters(): void {
  if (this.selectedTables.size > 0) {
      this.filteredTables = this.tables.filter((table:any) => this.selectedTables.has(table.name));
  } else {
      this.filteredTables = [...this.tables]; // Mostrar todas las tablas si no hay filtros
  }
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
  
  setFav(index: number) {
    let favs = sessionStorage.getItem('favs');
    let favArray: { id: string, originalIndex: number }[] = favs ? JSON.parse(favs) : [];

    const selectedTable = this.tables[index];

    // Check if the table is already in favs
    const favIndex = favArray.findIndex(fav => fav.id === selectedTable._id);

    if (favIndex === -1) {
        // Add to favs with original index
        favArray.push({ id: selectedTable._id, originalIndex: index });
        sessionStorage.setItem('favs', JSON.stringify(favArray));

        // Set fav to true and move to the top
        selectedTable.fav = true;
        this.tables.splice(index, 1);
        this.tables.unshift(selectedTable);
    } else {
        // Remove from favs and restore original position
        const originalIndex = favArray[favIndex].originalIndex;
        favArray.splice(favIndex, 1);
        sessionStorage.setItem('favs', JSON.stringify(favArray));

        // Set fav to false and move back to original position
        selectedTable.fav = false;
        this.tables.splice(index, 1);
        this.tables.splice(originalIndex, 0, selectedTable);
    }
  }
}
