import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { ICourt } from '../../interfaces/icourt';
@Component({
  selector: 'app-alter-reserva-adm-dialog',
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
  templateUrl: './alter-reserva-adm-dialog.html',
  styleUrl: './alter-reserva-adm-dialog.scss',
})
export class AlterReservaAdmDialog {
  nomeQuadra: string = '';
  horaInicio!: Date;
  horaFim!: Date;
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
  
  // Aqui vou usar MatDialogData
  constructor(public readonly _dialogRef: MatDialogRef<AlterReservaAdmDialog>) {}

  onSubmit(e: any) {
    console.log(e);
  }
}
