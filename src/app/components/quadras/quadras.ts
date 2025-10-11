import { Component, Input, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CourtService } from '../../services/court.service';

@Component({
  selector: 'app-quadras',
  imports: [MatIcon, CommonModule, DatePipe],
  templateUrl: './quadras.html',
  styleUrl: './quadras.scss',
})
export class Quadras {
  @Input({ required: true }) courts: ICourt[] = [];

  constructor(private readonly _courtService: CourtService) {}

  removeQuadra(q: ICourt) {
    this._courtService.removeCourt(q);
  }

  alterarQuadra() {
    throw new Error('Method not implemented.');
  }
}
