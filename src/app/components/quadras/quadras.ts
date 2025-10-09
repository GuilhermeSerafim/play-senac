import { Component, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import {  CommonModule } from '@angular/common';
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
