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
            const courtInfo = this.courts.find((court) => court.title === reserva.quadra.title);
            return {
              id: reserva.id,
              quadra: reserva.quadra,
              horario: reserva.horario,
              convidados: reserva.convidados,
              data: reserva.data,
              pathImg: courtInfo?.pathImg || 'images/default.png',
              capacidade: courtInfo?.capacidade || 0,
            };
          })
          .sort((a, b) => a.data.getTime() - b.data.getTime());
      })
    );
  }

  /**
   * Retorna uma nova data com uma hora a mais que a data fornecida.
   * @param data A data inicial.
   * @returns A nova data com +1 hora.
   */
  public getHorarioFinal(data: Date): Date {
    const dataFinal = new Date(data);
    dataFinal.setHours(dataFinal.getHours() + 1);
    return dataFinal;
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
    dialogRef
      .afterClosed()
      .subscribe((result) => result && this._reservaService.updateReserva(result));
  }
}
