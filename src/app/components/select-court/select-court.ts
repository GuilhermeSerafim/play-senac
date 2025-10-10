import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICourt } from '../../interfaces/icourt';
import { CourtService } from '../../services/court.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-select-court',
  imports: [MatIconModule],
  templateUrl: './select-court.html',
  styleUrl: './select-court.scss',
})
export class SelectCourt {
  courts: ICourt[] = [];

  constructor(private courtService: CourtService) {}

  ngOnInit(): void {
    this.courtService.getCourts().subscribe((courts) => (this.courts = courts));
  }
}
