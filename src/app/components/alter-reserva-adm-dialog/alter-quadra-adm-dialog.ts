import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';

import { ICourt } from '../../interfaces/icourt';
import { DiaDaSemana } from '../../enum/DiaDaSemana';
import { enumToObjectArray } from '../../enum/enumToObjectArray';

@Component({
  selector: 'app-alter-quadra-adm-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTimepickerModule,
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
  diasSelecionados: number[] = [];

  diasDaSemanaOptions: { key: number; value: string }[] = [];

  constructor(
    public readonly _dialogRef: MatDialogRef<AlterQuadraAdmDialog>,
    @Inject(MAT_DIALOG_DATA) public readonly _data: ICourt
  ) {}

  ngOnInit(): void {
    // Gera as opções para o select a partir do Enum
    this.diasDaSemanaOptions = enumToObjectArray(DiaDaSemana);

    if (this._data) {
      this.nomeQuadra = this._data.title;
      this.horaInicio = this._data.horarioAbertura;
      this.horaFim = this._data.horarioFechamento;
      this.capacidade = this._data.capacidade;
      this.imagemUrl = this._data.pathImg || '';
      this.diasSelecionados = this._data.diasDisponiveis ? [...this._data.diasDisponiveis] : [];
    }
  }

  onSubmit(): void {
    const quadraAlterada: ICourt = {
      id: this._data.id,
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
