import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  ],
  templateUrl: './faca-sua-reserva.html',
  styleUrl: './faca-sua-reserva.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // <-- Boa prática para performance
})
export class FacaSuaReserva {
  foods: Comida[] = [
    { value: 'bife-0', viewValue: 'Bife' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  quadraSelecionada: any;
  dataSelecionada: Date | null = null;
  horarioSelecionado: any;

  constructor(private dialog: MatDialog) {}

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
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dados do convidado:', result);
      } else {
        console.log('O diálogo foi cancelado.');
      }
    });
  }
}
