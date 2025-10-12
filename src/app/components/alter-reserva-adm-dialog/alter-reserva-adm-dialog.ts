import { Component, Inject, EventEmitter, OnInit, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { IReservaDisplay } from '../../interfaces/ireserva-display';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatButton } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { IConvidado } from '../../interfaces/iconvidado';
import { ICourt } from '../../interfaces/icourt';
import { CourtService } from '../../services/court.service';
import { IReserva } from '../../interfaces/ireserva';

@Component({
  selector: 'app-alter-reserva-adm-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatInput,
    MatOption,
    MatDatepickerModule,
    MatIconModule,
    MatDatepickerToggle,
    MatFormFieldModule,
    MatTimepickerModule,
    MatButton,
    MatDialogModule,
    MatChipsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSelectModule,
  ],
  templateUrl: './alter-reserva-adm-dialog.html',
  styleUrl: './alter-reserva-adm-dialog.scss',
})
export class AlterReservaAdmDialog implements OnInit {
  quadraSelecionada: string = '';
  dataSelecionada!: Date;
  horarioSelecionado!: Date;
  convidados: IConvidado[] = [];
  quadras: ICourt[] = [];

  constructor(
    private readonly _dialogRef: MatDialogRef<AlterReservaAdmDialog>,
    @Inject(MAT_DIALOG_DATA) private data: IReservaDisplay,
    private readonly _quadraService: CourtService
  ) {}

  ngOnInit(): void {
    this._quadraService.getCourts().subscribe((q) => (this.quadras = q));
    (this.quadraSelecionada = this.data.title),
      (this.dataSelecionada = this.data.data),
      (this.horarioSelecionado = this.data.horario),
      (this.convidados = this.data.convidados);
    console.log(this.data.horario);
  }

  abreDialogConvidado() {
    throw new Error('Method not implemented.');
  }

  removeConvidado(convidado: IConvidado) {
    this.convidados = this.convidados.filter((c) => c !== convidado);
  }

  onSubmit() {
    const reserva: IReserva = {
      id: this.data.id,
      quadra: this.quadraSelecionada,
      convidados: this.convidados,
      data: this.dataSelecionada,
      horario: this.horarioSelecionado,
    };
    this._dialogRef.close(reserva);
  }
}
