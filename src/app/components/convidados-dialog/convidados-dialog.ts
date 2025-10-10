import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IConvidado } from '../../interfaces/iconvidado';

@Component({
  selector: 'app-convidados-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './convidados-dialog.html',
  styleUrl: './convidados-dialog.scss',
})
export class ConvidadosDialog {
  emailConvidado: string = '';
  telefoneConvidado: string = '';
  nomeConvidado: string = '';

  constructor(public dialogRef: MatDialogRef<ConvidadosDialog>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit() {
    const convidado: IConvidado = {
      nome: this.nomeConvidado,
      telefone: this.telefoneConvidado,
      email: this.emailConvidado,
    };
    this.dialogRef.close(convidado);
  }
}
