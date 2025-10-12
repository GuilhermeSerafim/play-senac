import { Component, Input, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { IReserva } from '../../interfaces/ireserva';
import { CourtService } from '../../services/court.service';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ReservaService } from '../../services/reserva.service';
import { IReservaDisplay } from '../../interfaces/ireserva-display';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CancelarReservaDialog } from '../cancelar-reserva-dialog/cancelar-reserva-dialog';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-proximas-reservas',
  imports: [DatePipe, MatIcon, TitleCasePipe, MatDialogModule, AsyncPipe],
  templateUrl: './proximas-reservas.html',
  styleUrl: './proximas-reservas.scss',
})
export class ProximasReservas implements OnInit {
  courts: ICourt[] = [];
  // É um Observable porque ele é o resultado de uma operação sobre outro Observable.
  reservasCombinadas$!: Observable<IReservaDisplay[]>;

  constructor(
    private readonly _courtService: CourtService,
    private readonly _reservaService: ReservaService,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._courtService.getCourts().subscribe((courts) => (this.courts = courts));

    // Resultado: O reservasCombinadas$ se torna um novo Observable que emitirá esse array combinado e ordenado sempre que a fonte original (reservas$) emitir um novo valor.
    this.reservasCombinadas$ = this._reservaService.reservas$.pipe(
      map((reservasRecebidas) => {
        return reservasRecebidas
          .map((reserva) => {
            const courtInfo = this.courts.find((court) => court.title === reserva.quadra);
            return {
              id: reserva.id,
              title: reserva.quadra,
              horario: reserva.horario,
              data: reserva.data,
              pathImg: courtInfo?.pathImg || 'images/default.png',
              capacidade: courtInfo?.capacidade || 0,
            };
          })
          .sort((a, b) => a.data.getTime() - b.data.getTime());
      })
    );
  }

  cancelarReserva(idReserva: number) {
    const dialogRef = this._dialog.open(CancelarReservaDialog, {
      width: '540px',
    });
    dialogRef
      .afterClosed()
      .subscribe((remove) => remove && this._reservaService.removeReserva(idReserva));
  }
}
