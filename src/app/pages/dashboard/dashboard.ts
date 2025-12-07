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
import { BloqueiosAdm } from '../../components/bloqueios-adm/bloqueios-adm';
// Import do Spinner
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    Quadras,
    MatButton,
    ReservasAdm,
    Footer,
    Header,
    BloqueiosAdm,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  abaAtiva: string = 'quadras';
  quadras: ICourt[] = [];

  // 1. Controle de Loading
  isLoading = true;

  constructor(private readonly _courtService: CourtService, private readonly _dialog: MatDialog) {}

  ngOnInit(): void {
    // 2. Garante que começa carregando
    this.isLoading = true;

    this._courtService.getCourts().subscribe({
      next: (courts) => {
        this.quadras = courts;
        // 3. Desliga o loading assim que o ReplaySubject entregar os dados
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar quadras', err);
        this.isLoading = false;
      },
    });
  }

  ativarAba(aba: string) {
    this.abaAtiva = aba;
  }

  criarQuadra() {
    const dialogRef = this._dialog.open(CriarQuadraDialog, {
      width: '540px',
    });
    // O service já atualiza a lista automaticamente via ReplaySubject,
    // então não precisamos mexer no isLoading aqui, a atualização visual é instantânea.
    dialogRef.afterClosed().subscribe(() => {
      // Apenas fecha, o reload é automático pelo ReplaySubject do service
    });
  }
}
