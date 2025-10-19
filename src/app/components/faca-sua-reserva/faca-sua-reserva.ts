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

  teste() {
    console.log(this.dataSelecionada);
    console.log(this.horarioSelecionado);
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
   * Filtro para o MatDatepicker que desabilita todas as datas passadas.
   * Permite a seleção apenas da data atual ou de datas futuras.
   * * @param d A data que o calendário está tentando renderizar. Pode ser nula.
   * @returns {boolean} Retorna 'true' se a data for hoje ou futura, e 'false' caso contrário.
   */
  filtroDeData = (d: Date | null): boolean => {
    // Se a data for nula, retorna true para evitar erros inesperados.
    if (!d) {
      return true;
    }

    const hoje = new Date();

    // Zera as informações de tempo (horas, minutos, segundos) da data de hoje
    // para garantir que a comparação seja feita apenas com base no dia, mês e ano.
    hoje.setHours(0, 0, 0, 0);

    // Retorna 'true' apenas se a data do calendário (d) for maior ou igual a hoje.
    return d.getTime() >= hoje.getTime();
  };
}
