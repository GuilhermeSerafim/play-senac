import { Component, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { map, Observable } from 'rxjs';
import { IReservaDisplay } from '../../interfaces/ireserva-display';
import { CourtService } from '../../services/court.service';
import { ReservaService } from '../../services/reserva.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CancelarReservaDialog } from '../cancelar-reserva-dialog/cancelar-reserva-dialog';
import { AlterReservaAdmDialog } from '../alter-reserva-adm-dialog/alter-reserva-adm-dialog';

@Component({
  selector: 'app-reservas-adm',
  imports: [DatePipe, MatIcon, TitleCasePipe, MatDialogModule, AsyncPipe],
  templateUrl: './reservas-adm.html',
  styleUrl: './reservas-adm.scss',
})
export class ReservasAdm implements OnInit {
  courts: ICourt[] = [];
  reservasCombinadas$!: Observable<IReservaDisplay[]>;

  constructor(
    private readonly _courtService: CourtService,
    private readonly _reservaService: ReservaService,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._courtService.getCourts().subscribe((courts) => (this.courts = courts));
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

  alterarQuadra(reserva: IReservaDisplay) {
    const dialogRef = this._dialog.open(AlterReservaAdmDialog, {
      width: '540px',
      data: reserva,
    });
    dialogRef.afterClosed().subscribe((result) => result && this._courtService.updateCourt(result));
  }
}
