import { Component, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { CourtService } from '../../services/court.service';

@Component({
  selector: 'app-quadras',
  imports: [MatIcon, CommonModule],
  templateUrl: './quadras.html',
  styleUrl: './quadras.scss',
})
export class Quadras implements OnInit {
  // Vou ter que subir as quadras para colocar como @input no dashboard, pois o dashboard estará responsável pela criação, portanto adição, esse componente vai estar responsável pela manipulação e renderização
  courts: ICourt[] = [];
  constructor(private readonly _courtService: CourtService) {}

  ngOnInit(): void {
    this._courtService.getCourts().subscribe((courts) => (this.courts = courts));
  }

  cancelarQuadra() {
    throw new Error('Method not implemented.');
  }

  alterarQuadra() {
    throw new Error('Method not implemented.');
  }
}
