import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatChipsModule } from '@angular/material/chips';

import { IConvidado } from '../../interfaces/iconvidado';
import { ICourt } from '../../interfaces/icourt';
import { IReserva } from '../../interfaces/ireserva';
import { CourtService } from '../../services/court.service';
import { ConvidadosDialog } from '../convidados-dialog/convidados-dialog';

@Component({
  selector: 'app-alter-reserva-adm-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatChipsModule,
  ],
  templateUrl: './alter-reserva-adm-dialog.html',
  styleUrl: './alter-reserva-adm-dialog.scss',
})
export class AlterReservaAdmDialog implements OnInit {
  quadraSelecionada!: ICourt;

  dataSelecionada!: Date;
  horarioInicioSelecionado!: Date;
  horarioFimSelecionado!: Date;

  convidados: IConvidado[] = [];
  quadras: ICourt[] = [];

  constructor(
    private readonly _dialogRef: MatDialogRef<AlterReservaAdmDialog>,
    @Inject(MAT_DIALOG_DATA) public readonly _data: IReserva,
    private readonly _quadraService: CourtService,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // dataInicio serve tanto para a data quanto para a hora inicial
    this.dataSelecionada = new Date(this._data.dataInicio);
    this.horarioInicioSelecionado = new Date(this._data.dataInicio);
    this.horarioFimSelecionado = new Date(this._data.dataFim);

    this.convidados = this._data.convidados ? [...this._data.convidados] : [];

    this._quadraService.getCourts().subscribe((allCourts) => {
      this.quadras = allCourts;
      if (this._data.quadra) {
        this.quadraSelecionada = this.quadras.find((q) => q.id === this._data.quadra.id)!;
      }
    });
  }

  /**
   * Validação Lógica do Intervalo
   * Retorna uma string com o erro ou null se estiver tudo certo.
   */
  get erroDeHorario(): string | null {
    if (!this.horarioInicioSelecionado || !this.horarioFimSelecionado) return null;

    const inicio = new Date(this.horarioInicioSelecionado);
    const fim = new Date(this.horarioFimSelecionado);

    // Normaliza a data base para garantir que estamos comparando apenas as horas
    inicio.setFullYear(2000, 0, 1);
    fim.setFullYear(2000, 0, 1);

    const diferencaMs = fim.getTime() - inicio.getTime();
    const diferencaMinutos = diferencaMs / (1000 * 60);

    if (diferencaMinutos <= 0) return 'O fim deve ser após o início.';
    if (diferencaMinutos < 30) return 'Mínimo de 30 minutos.';
    if (diferencaMinutos > 120) return 'Máximo de 2 horas.';

    return null;
  }

  abreDialogConvidado() {
    const dialogRef = this._dialog.open(ConvidadosDialog, {
      width: '540px',
    });

    dialogRef.afterClosed().subscribe((novoConvidado: IConvidado) => {
      if (novoConvidado) {
        this.convidados.push(novoConvidado);
      }
    });
  }

  removeConvidado(convidado: IConvidado) {
    this.convidados = this.convidados.filter((c) => c !== convidado);
  }

  onSubmit() {
    if (this.erroDeHorario) return;

    const dataInicioFinal = new Date(this.dataSelecionada);
    const horaInicio = new Date(this.horarioInicioSelecionado);
    dataInicioFinal.setHours(horaInicio.getHours(), horaInicio.getMinutes(), 0);

    const dataFimFinal = new Date(this.dataSelecionada);
    const horaFim = new Date(this.horarioFimSelecionado);
    dataFimFinal.setHours(horaFim.getHours(), horaFim.getMinutes(), 0);

    const reservaAtualizada: IReserva = {
      ...this._data,
      quadra: this.quadraSelecionada,
      convidados: this.convidados,
      dataInicio: dataInicioFinal,
      dataFim: dataFimFinal,
    };

    this._dialogRef.close(reservaAtualizada);
  }
}
