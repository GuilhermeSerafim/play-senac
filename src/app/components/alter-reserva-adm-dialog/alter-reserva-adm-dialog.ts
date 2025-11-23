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
  horarioSelecionado!: Date;

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
    this.horarioSelecionado = new Date(this._data.dataInicio);

    this.convidados = this._data.convidados ? [...this._data.convidados] : [];

    this._quadraService.getCourts().subscribe((allCourts) => {
      this.quadras = allCourts;
      if (this._data.quadra) {
        this.quadraSelecionada = this.quadras.find((q) => q.id === this._data.quadra.id)!;
      }
    });
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
    // 1. Juntar Data + Hora em um objeto só
    const dataInicioFinal = new Date(this.dataSelecionada);
    const hora = new Date(this.horarioSelecionado);

    dataInicioFinal.setHours(hora.getHours(), hora.getMinutes(), 0);

    // 2. Calcular dataFim (Assumindo 1 hora de duração padrão)
    const dataFimFinal = new Date(dataInicioFinal);
    dataFimFinal.setHours(dataInicioFinal.getHours() + 1);

    // 3. Montar o objeto IReserva atualizado
    const reservaAtualizada: IReserva = {
      ...this._data, // Mantém ID, Usuario, etc.
      quadra: this.quadraSelecionada,
      convidados: this.convidados,
      dataInicio: dataInicioFinal,
      dataFim: dataFimFinal,
    };

    this._dialogRef.close(reservaAtualizada);
  }
}
