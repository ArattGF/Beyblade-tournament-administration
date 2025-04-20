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
  private scrollDirection: 1 | -1 = 1; // 1 = abajo, -1 = arriba
  private scrollSpeed = 5; // Pixeles por frame



  currentChunkIndex: number = 0;
  chunks: any[][] = [];
  private chunkInterval: any;



  constructor(
    private readonly pointsTablesService: PointsTablesService,
    private readonly socketService: SocketService) { }
  ngOnInit(): void {
    this.LoadData();
    this.listenForUpdates();

  }

  async ngAfterViewInit(): Promise<void> {
    await this.LoadData();

      this.startChunkRotation();
    
  }

  ngOnDestroy() {
    this.socketService.disconnect();
      this.clearChunkInterval();
    
  }

  private startChunkRotation(): void {
    if (window.innerWidth >= 1200) {
    

    if (window.innerWidth < 992) return;

    this.prepareChunks();
    this.clearChunkInterval();

    this.chunkInterval = setInterval(() => {
      this.currentChunkIndex = (this.currentChunkIndex + 1) % this.chunks.length;
    }, 10000);
  }
  }

  private prepareChunks(): void {
    
    this.chunks = [];

    if (window.innerWidth >= 1200) {
    

    for (let i = 0; i < this.filteredTables.length; i += 3) {
      this.chunks.push(this.filteredTables.slice(i, i + 3));
    }

    if (this.chunks.length === 0) this.chunks.push([]);
  }else{
    this.chunks = [[...this.filteredTables]]
  }
  }

  private clearChunkInterval(): void {
    if (this.chunkInterval) {
      clearInterval(this.chunkInterval);
      this.chunkInterval = null;
    }
  }


  LoadData(): Promise<void> {
    return this.pointsTablesService.GetAllTables().then(data => {
      // console.log(data);

      data.groups.forEach((group: any) => {
        group.fav = false;
      })


      this.tables = data.groups;
      this.tournamentName = data.tournamentName
      this.tournamentID = data.tournamentId
      this.infinals = data.tournamentStage === 'finals'

      this.filteredTables = [...this.tables]; // Inicialmente mostrar todas las tablas


        this.prepareChunks();

      console.log(this.chunks);
      this.pointsTablesService.getWinners(this.tournamentID).then((data: any) => {


        let i = 1;
        data.groups.forEach((group: any) => {
          group.seed = i;
          i++;
        });

        this.participants = data.groups;



      });

    }).catch(error => {
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
      this.filteredTables = this.tables.filter((table: any) => this.selectedTables.has(table.name));
    } else {
      this.filteredTables = [...this.tables]; // Mostrar todas las tablas si no hay filtros
    }

      this.prepareChunks();
      this.currentChunkIndex = 0;
      this.startChunkRotation();
    
  }
  private listenForUpdates() {
    this.socketService.onPlayersUpdate((playerUpdate) => {
      this.LoadData()
      // this.tournamentName = playerUpdate.tournamentName
    });


    this.socketService.onSetsUpdate((groupUpdated) => {

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

    this.applyFilters();
  }
}
