import { Component, inject, Input, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { IReserva } from '../../interfaces/ireserva';
import { CourtService } from '../../services/court.service';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ReservaService } from '../../services/reserva.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CancelarReservaDialog } from '../cancelar-reserva-dialog/cancelar-reserva-dialog';
import { combineLatest, map, Observable } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-proximas-reservas',
  imports: [
    DatePipe,
    MatIcon,
    TitleCasePipe,
    MatDialogModule,
    AsyncPipe,
    MatProgressSpinner,
    MatButtonModule,
  ],
  templateUrl: './proximas-reservas.html',
  styleUrl: './proximas-reservas.scss',
})
export class ProximasReservas implements OnInit {
  courts: ICourt[] = [];
  reservasHidratadas$!: Observable<IReserva[]>;
  private snackBar = inject(MatSnackBar);

  constructor(
    private readonly _courtService: CourtService,
    private readonly _reservaService: ReservaService,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._reservaService.getMinhasReservas().subscribe();
    this.reservasHidratadas$ = combineLatest([
      this._courtService.getCourts(),
      this._reservaService.reservas$,
    ]).pipe(
      map(([listaQuadras, listaReservas]) => {
        return listaReservas
          .map((reserva) => {
            const infoDaQuadra = listaQuadras.find((q) => q.id === reserva.quadra.id);
            return {
              ...reserva,
              quadra: {
                ...reserva.quadra,
                title: infoDaQuadra?.title || `Quadra #${reserva.quadra.id}`,
                pathImg: infoDaQuadra?.pathImg || 'assets/default.png',
                capacidade: infoDaQuadra?.capacidade || 0,
                horarioAbertura: infoDaQuadra?.horarioAbertura || undefined,
                horarioFechamento: infoDaQuadra?.horarioFechamento || undefined,
                diasDisponiveis: infoDaQuadra?.diasDisponiveis || [],
                bloqueada: infoDaQuadra?.bloqueada || false,
              },
            };
            // Ordena da mais próximo ao mais distante
          })
          .sort((a, b) => a.dataInicio.getTime() - b.dataInicio.getTime());
      })
    );
  }

  cancelarReserva(idReserva: number) {
    const dialogRef = this._dialog.open(CancelarReservaDialog, {
      width: '540px',
    });

    dialogRef.afterClosed().subscribe((remove) => {
      if (remove) {
        this._reservaService.removeReserva(idReserva).subscribe({
          next: () => {
            this.snackBar.open('Reserva excluida com sucesso!', 'OK', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
          },
          error: (err) => {
             this.snackBar.open(err.message ?? "Erro ao criar reserva", 'OK', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            console.error('Erro ao excluir', err);
          },
        });
      }
    });
  }
}
