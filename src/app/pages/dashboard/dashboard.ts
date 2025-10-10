import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Quadras } from '../../components/quadras/quadras';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CriarQuadraDialog } from '../../components/criar-quadra-dialog/criar-quadra-dialog';
import { ICourt } from '../../interfaces/icourt';
import { CourtService } from '../../services/court.service';

@Component({
  selector: 'app-dashboard',
  imports: [Header, Footer, FormsModule, CommonModule, Quadras, MatButton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  abaAtiva: string = 'quadras';
  quadras: ICourt[] = [];

  constructor(private readonly _courtService: CourtService, private readonly _dialog: MatDialog) {}

  ngOnInit(): void {
    this._courtService.getCourts().subscribe((courts) => (this.quadras = courts));
  }
  ativarAba(aba: string) {
    this.abaAtiva = aba;
  }

  criarQuadra() {
    const dialogRef = this._dialog.open(CriarQuadraDialog, {
      width: '540px',
    });
    dialogRef.afterClosed().subscribe((q) => (q ? this.quadras.push(q) : ''));
  }
}
