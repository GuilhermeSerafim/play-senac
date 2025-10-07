import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { ICourtCard } from '../../interfaces/icourt-card';

interface Comida {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-faca-sua-reserva',
  standalone: true, // <-- É uma boa prática declarar explicitamente
  providers: [provideNativeDateAdapter()],
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
  foods: Comida[] = [
    { value: 'bife-0', viewValue: 'Bife' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  quadraSelecionada: any;
  dataSelecionada: Date | null = null;
  horarioSelecionado: any;
  convidados: IConvidado[] = [];
  quadras: ICourtCard[] = [];

  constructor(private dialog: MatDialog, private readonly _quadraService: CourtService) {}
  
  ngOnInit(): void {
    this.quadras = this._quadraService.getCourts();
  }

  onSubmit(_t6: NgForm) {
    throw new Error('Method not implemented.');
  }

  teste() {
    console.log(this.dataSelecionada);
    console.log(this.horarioSelecionado);
  }
  abreDialogConvidado() {
    const dialogRef = this.dialog.open(ConvidadosDialog, {
      width: '540px',
    });
    dialogRef.afterClosed().subscribe((c) => c && this.convidados.push(c));
  }
  removeConvidado(c: IConvidado) {
    this.convidados = this.convidados.filter((convidado) => convidado !== c);
  }
}
