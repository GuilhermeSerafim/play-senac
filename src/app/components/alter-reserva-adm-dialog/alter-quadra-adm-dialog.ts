import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
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
    MatHint,
  ],
  templateUrl: './alter-quadra-adm-dialog.html',
  styleUrl: './alter-quadra-adm-dialog.scss',
})
export class AlterQuadraAdmDialog implements OnInit {
  nomeQuadra: string = '';
  horaInicio: Date | undefined;
  horaFim: Date | undefined;
  capacidade: number | undefined;
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
  constructor(
    public readonly _dialogRef: MatDialogRef<AlterQuadraAdmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ICourt
  ) {}

  ngOnInit(): void {
    this.nomeQuadra = this.data.title;
    this.horaInicio = this.data.horarioAbertura;
    this.horaFim = this.data.horarioFechamento;
    this.capacidade = this.data.capacidade;
    this.imagemUrl = this.data.pathImg || '';
    this.diasSelecionados = this.data.diasDisponiveis ? [...this.data.diasDisponiveis] : [];
  }

  onSubmit() {
    const quadraAlterada: ICourt = {
      id: this.data.id,
      title: this.nomeQuadra,
      horarioAbertura: this.horaInicio,
      horarioFechamento: this.horaFim,
      capacidade: this.capacidade,
      pathImg: this.imagemUrl,
      diasDisponiveis: this.diasSelecionados,
    };
    this._dialogRef.close(quadraAlterada);
  }
}
