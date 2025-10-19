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

import { IReservaDisplay } from '../../interfaces/ireserva-display';
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
    @Inject(MAT_DIALOG_DATA) public readonly _data: IReservaDisplay,
    private readonly _quadraService: CourtService,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSelecionada = this._data.data;
    this.horarioSelecionado = this._data.horario;
    this.convidados = this._data.convidados ? [...this._data.convidados] : [];

    this._quadraService.court$.subscribe((allCourts) => {
      this.quadras = allCourts;

      if (this._data.quadra) {
        // Encontra a quadra na lista do serviço pelo ID.
        // Isso garante que a referência do objeto é a correta para o <mat-select>
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
    const reservaAtualizada: IReserva = {
      id: this._data.id,
      quadra: this.quadraSelecionada,
      convidados: this.convidados,
      data: this.dataSelecionada,
      horario: this.horarioSelecionado,
    };
    this._dialogRef.close(reservaAtualizada);
  }
}
