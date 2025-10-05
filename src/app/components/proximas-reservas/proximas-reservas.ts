import { Component, Input, OnInit } from '@angular/core';
import { ICourtCard } from '../../types/icourt-card';
import { CourtService } from '../../services/court.service';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-proximas-reservas',
  imports: [DatePipe, MatIcon],
  templateUrl: './proximas-reservas.html',
  styleUrl: './proximas-reservas.scss',
})
export class ProximasReservas implements OnInit {
  @Input() courts: ICourtCard[] = [];
  constructor(private readonly _courtService: CourtService) {}
  ngOnInit(): void {
    this.courts = this._courtService.getCourts();
  }
}
