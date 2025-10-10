import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ICourt } from '../../interfaces/icourt';
import { MatOption, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-criar-quadra-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatIconModule,
    MatLabel,
    MatInput,
    MatTimepickerModule,
    MatDatepickerModule,
    MatError,
    MatButton,
    MatOption,
    MatSelectModule,
  ],
  templateUrl: './criar-quadra-dialog.html',
  styleUrl: './criar-quadra-dialog.scss',
})
export class CriarQuadraDialog {
  nomeQuadra: string = '';
  horaInicio: string = '';
  horaFim: string = '';
  capacidade!: number;
  imagemUrl: string = '';
  diasDaSemana: string[] = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ];
  diasSelecionados: string[] = [];

  constructor(public readonly dialogRef: MatDialogRef<CriarQuadraDialog>) {}
  onSubmit() {
    const quadra: ICourt = {
      pathImg: this.imagemUrl ?? 'images/Complexo Esportivo no Parque Urbano.png',
      title: this.nomeQuadra,
      capacidade: this.capacidade,
      diasDisponiveis: this.diasSelecionados,
      horarioAbertura: this.horaInicio,
      horarioFechamento: this.horaFim,
    };
    this.dialogRef.close(quadra);
  }
}
