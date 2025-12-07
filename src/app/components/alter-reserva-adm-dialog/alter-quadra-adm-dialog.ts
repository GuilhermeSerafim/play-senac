import { Component, Inject, OnInit, inject } from '@angular/core'; // inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';

import { ICourt } from '../../interfaces/icourt';
import { DiaDaSemana } from '../../enum/DiaDaSemana';
import { enumToObjectArray } from '../../enum/enumToObjectArray';

// 1. Novos Imports
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourtService } from '../../services/court.service';

@Component({
  selector: 'app-alter-quadra-adm-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTimepickerModule,
    MatProgressSpinnerModule, // Adicionado
    MatSnackBarModule // Adicionado
  ],
  templateUrl: './alter-quadra-adm-dialog.html',
  styleUrl: './alter-quadra-adm-dialog.scss',
})
export class AlterQuadraAdmDialog implements OnInit {
  nomeQuadra: string = '';
  horaInicio: Date | undefined;
  horaFim: Date | undefined;
  capacidade: number | undefined;
  imagemUrl: string = '';
  diasSelecionados: number[] = [];

  diasDaSemanaOptions: { key: number; value: string }[] = [];
  
  // 2. Loading
  isLoading = false;

  // 3. Injeções
  private courtService = inject(CourtService);
  private snackBar = inject(MatSnackBar);

  constructor(
    public readonly _dialogRef: MatDialogRef<AlterQuadraAdmDialog>,
    @Inject(MAT_DIALOG_DATA) public readonly _data: ICourt
  ) {}

  ngOnInit(): void {
    this.diasDaSemanaOptions = enumToObjectArray(DiaDaSemana);

    if (this._data) {
      this.nomeQuadra = this._data.title;
      // Garante conversão de string para Date se necessário
      this.horaInicio = new Date(this._data.horarioAbertura!);
      this.horaFim = new Date(this._data.horarioFechamento!);
      this.capacidade = this._data.capacidade;
      this.imagemUrl = this._data.pathImg || '';
      this.diasSelecionados = this._data.diasDisponiveis ? [...this._data.diasDisponiveis] : [];
    }
  }

  onSubmit(): void {
    // 4. Inicia Loading
    this.isLoading = true;

    const quadraAlterada: ICourt = {
      id: this._data.id,
      title: this.nomeQuadra,
      horarioAbertura: this.horaInicio,
      horarioFechamento: this.horaFim,
      capacidade: this.capacidade!,
      pathImg: this.imagemUrl,
      diasDisponiveis: this.diasSelecionados,
      bloqueada: this._data.bloqueada // Mantém o status atual
    };

    // 5. Chama o Service
    this.courtService.updateCourt(quadraAlterada).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Quadra alterada com sucesso!', 'OK', { duration: 3000 });
        this._dialogRef.close(true);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.snackBar.open('Erro ao alterar quadra.', 'Fechar', { duration: 3000 });
      }
    });
  }
}