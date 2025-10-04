import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { ICourtCard } from '../../types/icourt-card';
import { CourtService } from '../../services/court.service';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reservas',
  imports: [Header, Footer, DatePipe, MatIcon],
  templateUrl: './reservas.html',
  styleUrl: './reservas.scss',
})
export class Reservas implements OnInit {
  courts: ICourtCard[] = [];

  constructor(private courtService: CourtService) {
    this.courts = this.courtService.getCourts();
  }

  ngOnInit(): void {
    this.courts = this.courtService.getCourts();
  }
}
