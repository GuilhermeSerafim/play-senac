import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatIconModule } from '@angular/material/icon';
import { ICourt } from '../../interfaces/icourt';
import { ICreateBloqueio } from '../../interfaces/ibloqueio';

@Component({
  selector: 'app-bloqueio-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatIconModule,
  ],
  templateUrl: './bloqueio-dialog.html',
  styleUrl: './bloqueio-dialog.scss',
})
export class BloqueioDialog {
  dataSelecionada!: Date;
  horarioInicioSelecionado!: Date;
  horarioFimSelecionado!: Date;
  motivo: string = '';

  constructor(
    public dialogRef: MatDialogRef<BloqueioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { quadra: ICourt }
  ) {}

  get erroDeHorario(): string | null {
    if (!this.horarioInicioSelecionado || !this.horarioFimSelecionado) return null;

    const inicio = new Date(this.horarioInicioSelecionado);
    const fim = new Date(this.horarioFimSelecionado);

    // Normaliza a data para comparar apenas horas
    inicio.setFullYear(2000, 0, 1);
    fim.setFullYear(2000, 0, 1);

    if (fim.getTime() <= inicio.getTime()) {
      return 'O horário final deve ser após o inicial.';
    }
    return null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (
      !this.dataSelecionada ||
      !this.horarioInicioSelecionado ||
      !this.horarioFimSelecionado ||
      !this.motivo
    ) {
      return;
    }

    if (this.erroDeHorario) return;

    // Montar datas completas
    const dataInicio = new Date(this.dataSelecionada);
    const horaInicio = new Date(this.horarioInicioSelecionado);
    dataInicio.setHours(horaInicio.getHours(), horaInicio.getMinutes(), 0);

    const dataFim = new Date(this.dataSelecionada);
    const horaFim = new Date(this.horarioFimSelecionado);
    dataFim.setHours(horaFim.getHours(), horaFim.getMinutes(), 0);

    const novoBloqueio: ICreateBloqueio = {
      dataHoraInicio: this.formatDateForJava(dataInicio),
      dataHoraFim: this.formatDateForJava(dataFim),
      motivo: this.motivo,
      idQuadra: this.data.quadra.id,
      idUsuario: 17, // TODO: Pegar ID do admin logado dinamicamente
    };

    this.dialogRef.close(novoBloqueio);
  }

  private formatDateForJava(date: Date): string {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('.')[0];
  }

 filtroDeData = (d: Date | null): boolean => {
  if (!d) return true;

  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  hoje.setHours(0, 0, 0, 0);

  const ehHojeOuFuturo = d.getTime() >= hoje.getTime();
  const ehDoAnoAtual = d.getFullYear() === anoAtual;

  const quadra = this.data?.quadra;

  // Se por algum motivo não tiver quadra ou não tiver diasDisponiveis, não deixa selecionar
  if (!quadra || !quadra.diasDisponiveis || quadra.diasDisponiveis.length === 0) {
    return false;
  }

  const diaDaSemana = d.getDay(); // 0 = Domingo, 1 = Segunda, ...
  const ehDiaDisponivel = quadra.diasDisponiveis.includes(diaDaSemana);

  return ehHojeOuFuturo && ehDoAnoAtual && ehDiaDisponivel;
};
}
