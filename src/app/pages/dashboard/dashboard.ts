import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Quadras } from '../../components/quadras/quadras';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CriarQuadraDialog } from '../../components/criar-quadra-dialog/criar-quadra-dialog';
import { ICourt } from '../../interfaces/icourt';
import { CourtService } from '../../services/court.service';
import { ReservasAdm } from '../../components/reservas-adm/reservas-adm';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule, Quadras, MatButton, ReservasAdm, Footer, Header],
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
    dialogRef.afterClosed().subscribe((q) => q && this._courtService.addCourt(q));
  }
}
