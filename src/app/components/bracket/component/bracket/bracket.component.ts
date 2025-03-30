import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, OnChanges, signal, SimpleChanges } from '@angular/core';
import { ArrayPipe } from '../../pipes/array.pipe';
import { HostListener } from '@angular/core';
import { BracketService } from '../../services/bracket.service';

interface Participant {
  _id: string;
  name: string;
  elimPoints?: number;
  group?: string;
  groupPoints?: number;
  region?: string;
  totalSets?: number;
  tournament?: string;
  victories?: number;
  seed?: number;
  isBye?: boolean;
}

interface Match {
  id: string;
  round: number;
  participant1?: Participant;
  participant2?: Participant;
  winner?: Participant;
  nextMatchId?: number;
  isThirdPlaceMatch?: boolean;
}

@Component({
  selector: 'app-bracket',
  standalone: true,
  imports: [CommonModule, ArrayPipe],
  templateUrl: './bracket.component.html',
  styleUrl: './bracket.component.css'
})
export class BracketComponent implements OnInit, OnChanges{
  

  @Input({ required: true }) participants: Participant[] = [];
  @Input({ required: true }) tournamentId: string = "";

  matches = signal<Match[]>([]);
  rounds = 0;
  thirdPlaceMatch?: Match;


  constructor(private cdr: ChangeDetectorRef,
    private readonly bracketService: BracketService
  ) {}

  ngOnInit(): void {
    this.initializeBracket();

    
   
    

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['participants'] && this.participants?.length > 0) {
      this.initializeBracket();
      this.cdr.markForCheck();
      
    }


  
  }


  initializeBracket(): void { 
this.bracketService.getBracket(this.tournamentId).then ((data: any)=>{


  this.matches.set(data.matchlist);
  this.thirdPlaceMatch = data.thirdplacematch;
  this.rounds = data.matchlist.reduce((max: any, match: any) => {
    return match.round > max ? match.round : max;
  }, 0);
  
})
  }


  
  getMatchesByRound(round: number): Match[] {
    return this.matches().filter(m => m.round === round);
  }

  getRoundName(round: number): string {
    const roundNames = ['Cuartos de final', 'Semifinal', 'Final'];
    return roundNames[round - roundNames.length + 2] || `Eliminatoria ${round}`;
  }


  @HostListener('window:resize')
  onResize() {
    this.handleResponsiveLayout();
  }

  private handleResponsiveLayout() {
    const bracketContainer = document.querySelector('.bracket-container') as HTMLElement;

    if (bracketContainer && window.innerWidth >= 1024) {
      const containerWidth = bracketContainer.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scale = Math.min(1.2, viewportWidth / containerWidth * 0.9);
      bracketContainer.style.transform = `scale(${scale})`;
    } else if (bracketContainer) {
      bracketContainer.style.transform = 'none';
    }
  }

}