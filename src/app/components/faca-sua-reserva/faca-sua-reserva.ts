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
  standalone: true, // <-- É uma boa prática declarar explicitamente
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
  horarioSelecionado!: Date;
  convidados: IConvidado[] = [];

  quadras: ICourt[] = [];

  // Vamos usar isso apenas para o pai saber que deve ir para os próximos reservas, pois ele que orquestra isso
  @Output('aoCriarReserva') aoCriarReservaEmmit = new EventEmitter<void>();

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _courtService: CourtService,
    private readonly _reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this._courtService.getCourts().subscribe((q) => (this.quadras = q));
  }

  onSubmit(f: NgForm) {
    if (f.invalid) return;

    const reserva: ICreateReserva = {
      quadra: this.quadraSelecionada,
      data: this.dataSelecionada,
      horario: this.horarioSelecionado,
      convidados: this.convidados,
    };

    this._reservaService.addReserva(reserva);
    this.aoCriarReservaEmmit.emit();
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

  /**
   * Desabilita:
   * 1. Todas as datas passadas.
   * 2. Todas as datas que não pertencem ao ano atual.
   * * 3. Todos os dias da semana em que a quadra selecionada não funciona.
   * @param d A data que o calendário está tentando renderizar. Pode ser nula.
   * @returns {boolean} Retorna 'true' se a data for válida, e 'false' caso contrário.
   */
  filtroDeData = (d: Date | null): boolean => {
    if (!d) {
      return true;
    }

    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    hoje.setHours(0, 0, 0, 0); // Zera o tempo para comparação

    const ehHojeOuFuturo = d.getTime() >= hoje.getTime();
    const ehDoAnoAtual = d.getFullYear() === anoAtual;

    if (!this.quadraSelecionada || !this.quadraSelecionada.diasDisponiveis) {
      return false;
    }

    const diaDaSemana = d.getDay();

    // Verifica se o dia da semana da data 'd' está incluído no array de dias da quadra
    const ehDiaDisponivel = this.quadraSelecionada.diasDisponiveis.includes(diaDaSemana);

    // Retorna true APENAS se todas as condições passarem
    return ehHojeOuFuturo && ehDoAnoAtual && ehDiaDisponivel;
  };

  /**
   * Chamado quando o usuário troca a quadra.
   * Limpa as seleções dependentes para evitar dados inválidos.
   */
  onQuadraChange() {
    this.dataSelecionada = undefined!;
    this.horarioSelecionado = undefined!;
    this.convidados = [];
  }
}
