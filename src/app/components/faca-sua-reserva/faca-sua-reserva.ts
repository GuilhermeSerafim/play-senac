import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatButton } from '@angular/material/button';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConvidadosDialog } from '../convidados-dialog/convidados-dialog';
import { IConvidado } from '../../interfaces/iconvidado';
import { MatChipsModule } from '@angular/material/chips';
import { CourtService } from '../../services/court.service';
import { ICourt } from '../../interfaces/icourt';
import { ReservaService } from '../../services/reserva.service';
import { ICreateReserva } from '../../interfaces/ireserva';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-faca-sua-reserva',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatTimepickerModule,
    MatButton,
    MatDialogModule,
    MatChipsModule,
    MatInput,
  ],
  templateUrl: './faca-sua-reserva.html',
  styleUrl: './faca-sua-reserva.scss',
})
export class FacaSuaReserva implements OnInit {
  quadraSelecionada!: ICourt;
  dataSelecionada!: Date;
  
  // Variáveis separadas para horário
  horarioInicioSelecionado!: Date;
  horarioFimSelecionado!: Date;
  
  convidados: IConvidado[] = [];
  quadras: ICourt[] = [];

  @Output('aoCriarReserva') aoCriarReservaEmmit = new EventEmitter<void>();

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _courtService: CourtService,
    private readonly _reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this._courtService.getCourts().subscribe((q) => (this.quadras = q));
  }

  /**
   * Validação Lógica do Intervalo
   */
  get erroDeHorario(): string | null {
    if (!this.horarioInicioSelecionado || !this.horarioFimSelecionado) return null;

    const inicio = new Date(this.horarioInicioSelecionado);
    const fim = new Date(this.horarioFimSelecionado);

    inicio.setFullYear(2000, 0, 1);
    fim.setFullYear(2000, 0, 1);

    const diferencaMs = fim.getTime() - inicio.getTime();
    const diferencaMinutos = diferencaMs / (1000 * 60);

    if (diferencaMinutos <= 0) return 'O fim deve ser após o início.';
    if (diferencaMinutos < 30) return 'Mínimo de 30 minutos.';
    if (diferencaMinutos > 120) return 'Máximo de 2 horas.';

    return null;
  }

  onSubmit(f: NgForm) {
    if (f.invalid || this.erroDeHorario) return;

    // 1. Monta Data INICIO
    const dataInicioFinal = new Date(this.dataSelecionada);
    const horaInicio = new Date(this.horarioInicioSelecionado);
    dataInicioFinal.setHours(horaInicio.getHours(), horaInicio.getMinutes(), 0);

    // 2. Monta Data FIM
    const dataFimFinal = new Date(this.dataSelecionada);
    const horaFim = new Date(this.horarioFimSelecionado);
    dataFimFinal.setHours(horaFim.getHours(), horaFim.getMinutes(), 0);

    // 3. Cria o Payload
    const novaReserva: ICreateReserva = {
      quadraId: this.quadraSelecionada.id,
      usuarioId: 17, // TODO: Pegar do AuthService/LocalStorage dinamicamente
      dataInicio: dataInicioFinal,
      dataFim: dataFimFinal,
      // Cria uma copia do arr
      convidados: [...this.convidados],
    };

    this._reservaService.addReserva(novaReserva).subscribe({
      next: () => {
        f.resetForm(); // Para limpar os validadores tb
        this.onQuadraChange();
        this.aoCriarReservaEmmit.emit();
      },
      error: (err) => console.error('Erro ao criar:', err)
    });
  }

  abreDialogConvidado() {
    const dialogRef = this._dialog.open(ConvidadosDialog, {
      width: '540px',
    });
    dialogRef.afterClosed().subscribe((c) => c && this.convidados.push(c));
  }

  removeConvidado(c: IConvidado) {
    this.convidados = this.convidados.filter((convidado) => convidado !== c);
  }

  filtroDeData = (d: Date | null): boolean => {
    if (!d) return true;

    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    hoje.setHours(0, 0, 0, 0);

    const ehHojeOuFuturo = d.getTime() >= hoje.getTime();
    const ehDoAnoAtual = d.getFullYear() === anoAtual;

    if (!this.quadraSelecionada || !this.quadraSelecionada.diasDisponiveis) {
      return false;
    }

    const diaDaSemana = d.getDay();
    const ehDiaDisponivel = this.quadraSelecionada.diasDisponiveis.includes(diaDaSemana);

    return ehHojeOuFuturo && ehDoAnoAtual && ehDiaDisponivel;
  };

  onQuadraChange() {
    this.dataSelecionada = undefined!;
    this.horarioInicioSelecionado = undefined!;
    this.horarioFimSelecionado = undefined!;
    this.convidados = [];
  }
}