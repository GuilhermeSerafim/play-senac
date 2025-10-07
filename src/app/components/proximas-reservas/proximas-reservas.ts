import { Component, Input, OnInit } from '@angular/core';
import { ICourtCard } from '../../interfaces/icourt-card';
import { IReserva } from '../../interfaces/ireserva';
import { CourtService } from '../../services/court.service';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ReservaService } from '../../services/reserva.service';
import { IReservaDisplay } from '../../interfaces/ireserva-display';

@Component({
  selector: 'app-proximas-reservas',
  imports: [DatePipe, MatIcon, TitleCasePipe],
  templateUrl: './proximas-reservas.html',
  styleUrl: './proximas-reservas.scss',
})
export class ProximasReservas implements OnInit {
  courts: ICourtCard[] = [];
  reservas: IReserva[] = [];
  public reservasCombinadas: IReservaDisplay[] = [];
  constructor(
    private readonly _courtService: CourtService,
    private readonly _reservaService: ReservaService
  ) {}
  
  ngOnInit(): void {
    this.courts = this._courtService.getCourts();
    this.reservas = this._reservaService.getReservas();
    this.combinarDados();
  }

  private combinarDados(): void {
    this.reservasCombinadas = this.reservas
      .map((reserva) => {
        const courtInfo = this.courts.find((court) => court.title === reserva.quadra);

        return {
          pathImg: courtInfo?.pathImg || 'caminho/para/imagem/default.png',
          title: reserva.quadra,
          horario: reserva.horario,
          capacidade: courtInfo?.capacidade,
          data: reserva.data,
        };
      })
      .sort((a, b) => a.data.getTime() - b.data.getTime()); // Ordena por data
  }
}
