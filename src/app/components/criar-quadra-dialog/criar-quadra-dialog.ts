import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core'; // inject
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ICreateCourt } from '../../interfaces/icourt';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { enumToObjectArray } from '../../enum/enumToObjectArray';
import { DiaDaSemana } from '../../enum/DiaDaSemana';
// 1. Imports Novos
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourtService } from '../../services/court.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-criar-quadra-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogContent, // Removi MatDialogClose do import pois vamos fechar manualmente
    MatDialogTitle,
    MatFormField,
    MatIconModule,
    MatLabel,
    MatInput,
    MatTimepickerModule,
    MatDatepickerModule,
    MatError,
    MatButton,
    MatOption,
    MatSelectModule,
    MatProgressSpinnerModule, // Adicionado
    MatSnackBarModule // Adicionado
  ],
  templateUrl: './criar-quadra-dialog.html',
  styleUrl: './criar-quadra-dialog.scss',
})
export class CriarQuadraDialog implements OnInit {
  nomeQuadra: string = '';
  horaInicio!: Date;
  horaFim!: Date;
  capacidade!: number;
  imagemUrl: string = '';

  diasDaSemanaOptions: { key: number; value: string }[] = [];
  diasSelecionados: number[] = [];
  
  // 2. Variável de Loading
  isLoading = false;

  // 3. Injeção de dependências
  private courtService = inject(CourtService);
  private snackBar = inject(MatSnackBar);

  constructor(public readonly _dialogRef: MatDialogRef<CriarQuadraDialog>) {}

  ngOnInit(): void {
    this.diasDaSemanaOptions = enumToObjectArray(DiaDaSemana);
  }
   
  onSubmit() {
    // 4. Inicia Loading
    this.isLoading = true;

    const quadra: ICreateCourt = {
      pathImg: this.imagemUrl ? this.imagemUrl : 'images/Complexo Esportivo no Parque Urbano.png', // Ajuste path se necessário
      title: this.nomeQuadra,
      capacidade: this.capacidade,
      diasDisponiveis: this.diasSelecionados,
      horarioAbertura: this.horaInicio,
      horarioFechamento: this.horaFim,
    };
    
    // 5. Chama o service AQUI dentro
    this.courtService.addCourt(quadra).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Quadra criada com sucesso!', 'OK', { duration: 3000 });
        this._dialogRef.close(true); // Fecha indicando sucesso
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.snackBar.open('Erro ao criar quadra.', 'Fechar', { duration: 3000 });
      }
    });
  }
}