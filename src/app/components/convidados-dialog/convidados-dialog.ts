import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-convidados-dialog',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './convidados-dialog.html',
  styleUrl: './convidados-dialog.scss',
})
export class ConvidadosDialog {
  constructor(public dialogRef: MatDialogRef<ConvidadosDialog>) {}

  // ℹ️ Lógica de Confirmação (será chamada pelo clique do botão "Confirmar")
  onConfirm(): void {
    // Aqui você coletaria os dados do formulário
    const dados = { nome: '', telefone: '', email: '' };

    // Fecha o diálogo e passa os dados como resultado
    this.dialogRef.close(dados);
  }

  // Lógica de Cancelamento (pode ser opcional se você usar mat-dialog-close no template)
  onCancel(): void {
    this.dialogRef.close(false); // Retorna 'false' ou 'undefined' para indicar cancelamento
  }
}
