import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ICreateCourt } from '../../interfaces/icourt';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { enumToObjectArray } from '../../enum/enumToObjectArray';
import { DiaDaSemana } from '../../enum/DiaDaSemana';

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
export class CriarQuadraDialog implements OnInit {
  nomeQuadra: string = '';
  horaInicio!: Date;
  horaFim!: Date;
  capacidade!: number;
  imagemUrl: string = '';

  diasDaSemanaOptions: { key: number; value: string }[] = [];
  diasSelecionados: number[] = [];

  constructor(public readonly _dialogRef: MatDialogRef<CriarQuadraDialog>) {}

  ngOnInit(): void {
    this.diasDaSemanaOptions = enumToObjectArray(DiaDaSemana);
  }
  
  onSubmit() {
    const quadra: ICreateCourt = {
      pathImg: this.imagemUrl ? this.imagemUrl : 'images/Complexo Esportivo no Parque Urbano.png',
      title: this.nomeQuadra,
      capacidade: this.capacidade,
      diasDisponiveis: this.diasSelecionados,
      horarioAbertura: this.horaInicio,
      horarioFechamento: this.horaFim,
    };
    this._dialogRef.close(quadra);
  }
}
