import { Component, inject, Input, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CourtService } from '../../services/court.service';
import { MatDialog } from '@angular/material/dialog';
import { CancelarReservaAdmDialog } from '../cancelar-reserva-adm-dialog/cancelar-reserva-adm-dialog';
import { AlterQuadraAdmDialog } from '../alter-reserva-adm-dialog/alter-quadra-adm-dialog';
import { DiaDaSemana } from '../../enum/DiaDaSemana';
import { BloqueioDialog } from '../bloqueio-dialog/bloqueio-dialog';
import { ICreateBloqueio } from '../../interfaces/ibloqueio';
import { BloqueioService } from '../../services/bloqueio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RemoveQuadraAdmDialog } from '../remove-quadra-adm-dialog/remove-quadra-adm-dialog';

@Component({
  selector: 'app-quadras',
  imports: [MatIcon, CommonModule, DatePipe],
  templateUrl: './quadras.html',
  styleUrl: './quadras.scss',
})
export class Quadras {
  @Input({ required: true }) courts: ICourt[] = [];
  public diaDaSemanaEnum = DiaDaSemana;
  private bloqueioService = inject(BloqueioService);
  private snackBar = inject(MatSnackBar);

  constructor(private readonly _courtService: CourtService, private readonly _dialog: MatDialog) {}

  removeQuadra(quadra: ICourt) {
    const dialogRef = this._dialog.open(RemoveQuadraAdmDialog, {
      width: '540px',
      data: { id: quadra.id, nome: quadra.title },
    });
    dialogRef.afterClosed().subscribe();
  }

  alterarQuadra(quadra: ICourt) {
    const dialogRef = this._dialog.open(AlterQuadraAdmDialog, {
      width: '540px',
      data: quadra,
    });
    dialogRef.afterClosed().subscribe((result) => result && this._courtService.updateCourt(result));
  }

  bloquearQuadra(quadra: ICourt) {
    const dialogRef = this._dialog.open(BloqueioDialog, {
      width: '450px',
      data: { quadra: quadra }, // Passa a quadra para o título do modal
    });

    dialogRef.afterClosed().subscribe((novoBloqueio: ICreateBloqueio) => {
      if (novoBloqueio) {
        this.bloqueioService.create(novoBloqueio).subscribe({
          next: () => {
            this.snackBar.open('Quadra bloqueada com sucesso!', 'OK', { duration: 3000 });
            // Opcional: Atualizar visual da quadra se necessário
          },
          error: (err) => {
            console.error('Erro ao bloquear:', err);
            // Se o back retornar erro 409 (conflito com reservas), trate aqui
            if (err.status === 409) {
              this.snackBar.open(
                'Não foi possível bloquear: Existem reservas neste horário.',
                'Fechar',
                { duration: 5000 }
              );
            } else {
              this.snackBar.open('Erro ao criar bloqueio.', 'Fechar', { duration: 3000 });
            }
          },
        });
      }
    });
  }
}
