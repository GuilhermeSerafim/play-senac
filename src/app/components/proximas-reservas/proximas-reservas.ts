import { Component, inject, Input, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { IReserva } from '../../interfaces/ireserva';
import { CourtService } from '../../services/court.service';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ReservaService } from '../../services/reserva.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CancelarReservaDialog } from '../cancelar-reserva-dialog/cancelar-reserva-dialog';
import { BehaviorSubject, combineLatest, map, Observable, switchMap, tap } from 'rxjs';
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
  private refresh$ = new BehaviorSubject<void>(undefined);
  isLoading = true;

  constructor(
    private readonly _courtService: CourtService,
    private readonly _reservaService: ReservaService,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reservasHidratadas$ = this.refresh$.pipe(
      tap(() => (this.isLoading = true)),
      switchMap(() => {
        return combineLatest([
          this._courtService.getCourts(),
          this._reservaService.getMinhasReservas(),
        ]);
      }),
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
              },
            };
          })
          .sort((a, b) => a.dataInicio.getTime() - b.dataInicio.getTime());
      }),
      tap(() => (this.isLoading = false))
    );
  }

  cancelarReserva(idReserva: number) {
    const dialogRef = this._dialog.open(CancelarReservaDialog, {
      width: '540px',
    });

    dialogRef.afterClosed().subscribe((remove) => {
      if (remove) {
        this.isLoading = true;
        this._reservaService.removeReserva(idReserva).subscribe({
          next: () => {
            // Dispara o refresh (que vai cair no fluxo do ngOnInit e gerenciar o loading)
            this.refresh$.next();
            this.snackBar.open('Reserva excluida com sucesso!', 'OK', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
          },
          error: (err) => {
            this.isLoading = false;
            this.snackBar.open(err.message ?? 'Erro ao criar reserva', 'OK', {
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
