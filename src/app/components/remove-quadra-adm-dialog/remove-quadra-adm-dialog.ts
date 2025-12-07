import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
  MAT_DIALOG_DATA, // Importante para receber o ID
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// Imports Novos
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourtService } from '../../services/court.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-remove-quadra-adm-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, // Opcional, já que vamos controlar manualmente
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule, // Adicionado
    MatSnackBarModule, // Adicionado
  ],
  templateUrl: './remove-quadra-adm-dialog.html',
  styleUrl: './remove-quadra-adm-dialog.scss',
})
export class RemoveQuadraAdmDialog {
  isLoading = false;

  private courtService = inject(CourtService);
  private snackBar = inject(MatSnackBar);

  constructor(
    public readonly _dialogRef: MatDialogRef<RemoveQuadraAdmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; nome: string } // Recebe dados
  ) {}

  confirmarExclusao() {
    this.isLoading = true;

    this.courtService.removeCourt(this.data.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Quadra removida com sucesso!', 'OK', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this._dialogRef.close(true);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao remover', err);
        // Tratamento específico para erro de integridade (ex: tem reservas vinculadas)
        if (err.status === 409 || err.status === 500) {
           this.snackBar.open('Não é possível remover: Existem reservas ou dependências.', 'Fechar', { duration: 5000 });
        } else {
           this.snackBar.open('Erro ao remover quadra.', 'Fechar', { duration: 3000 });
        }
      },
    });
  }
}