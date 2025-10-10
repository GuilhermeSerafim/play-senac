import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
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
import { ICreateReserva, IReserva } from '../../interfaces/ireserva';

@Component({
  selector: 'app-faca-sua-reserva',
  standalone: true, // <-- É uma boa prática declarar explicitamente
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
  ],
  templateUrl: './faca-sua-reserva.html',
  styleUrl: './faca-sua-reserva.scss',
})
export class FacaSuaReserva implements OnInit {
  quadraSelecionada: any;
  dataSelecionada: Date | null = null;
  horarioSelecionado: any;
  convidados: IConvidado[] = [];
  quadras: ICourt[] = [];

  // Vamos usar isso apenas para o pai saber que deve ir para os próximos reservas, pois ele que orquestra isso
  @Output('aoCriarReserva') aoCriarReservaEmmit = new EventEmitter<void>();

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _quadraService: CourtService,
    private readonly _reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this._quadraService.getCourts().subscribe((q) => (this.quadras = q));
  }

  onSubmit(f: NgForm) {
    const reserva: ICreateReserva = {
      convidados: f.value.convidados,
      data: f.value.dataSelecionada,
      horario: f.value.horarioSelecionado,
      quadra: f.value.quadraSelecionada,
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
}
