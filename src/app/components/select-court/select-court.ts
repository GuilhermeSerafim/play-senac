import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICourtCard } from '../../types/icourt-card';
import { CourtService } from '../../services/court.service';

@Component({
  selector: 'app-select-court',
  imports: [MatIconModule],
  templateUrl: './select-court.html',
  styleUrl: './select-court.scss',
})
export class SelectCourt {
  courts: ICourtCard[] = [];

  constructor(private courtService: CourtService) {
    this.courts = this.courtService.getCourts();
  }

  ngOnInit(): void {
    this.courts = this.courtService.getCourts();
  }
}
