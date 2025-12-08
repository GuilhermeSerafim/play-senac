import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, combineLatest, map } from 'rxjs';

import { BloqueioService } from '../../services/bloqueio.service';
import { CourtService } from '../../services/court.service';
import { IBloqueio } from '../../interfaces/ibloqueio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Import do Dialog recém-criado
import { RemoverBloqueioDialog } from '../remover-bloqueio-dialog/remover-bloqueio-dialog';

interface IBloqueioDisplay extends IBloqueio {
  nomeQuadra: string;
  imgQuadra: string;
}

@Component({
  selector: 'app-bloqueios-adm',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule, 
    DatePipe,
    MatSnackBarModule,
    MatProgressSpinner,
    MatDialogModule // Adicionado
  ],
  templateUrl: './bloqueios-adm.html',
  styleUrl: './bloqueios-adm.scss'
})
export class BloqueiosAdm implements OnInit {
  private bloqueioService = inject(BloqueioService);
  private courtService = inject(CourtService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog); // Injeção do Dialog

  bloqueios$!: Observable<IBloqueioDisplay[]>;

  ngOnInit() {
    this.carregarBloqueios();
  }

  carregarBloqueios() {
    this.bloqueios$ = combineLatest([
      this.bloqueioService.getAll(),
      this.courtService.getCourts()
    ]).pipe(
      map(([bloqueios, quadras]) => {
        return bloqueios.map(bloqueio => {
          const quadra = quadras.find(q => q.id === bloqueio.idQuadra);
          
          return {
            ...bloqueio,
            nomeQuadra: quadra?.title || `Quadra #${bloqueio.idQuadra}`,
            imgQuadra: quadra?.pathImg || 'images/Complexo Esportivo no Parque Urbano.png',
            dataHoraInicio: new Date(bloqueio.dataHoraInicio),
            dataHoraFim: new Date(bloqueio.dataHoraFim)
          };
        })
        .sort((a, b) => a.dataHoraInicio.getTime() - b.dataHoraInicio.getTime());
      })
    );
  }

  removerBloqueio(id: number) {
    // Abre o Dialog de confirmação
    const dialogRef = this.dialog.open(RemoverBloqueioDialog, {
      width: '100%',
      maxWidth: '400px' // Tamanho confortável para alertas
    });

    dialogRef.afterClosed().subscribe(result => {
      // Se result for true, o usuário clicou em "Desbloquear"
      if (result === true) {
        this.bloqueioService.delete(id).subscribe({
          next: () => {
            // Exibe o SnackBar
            this.snackBar.open('Bloqueio removido com sucesso!', 'OK', { 
              duration: 3000,
              panelClass: ['success-snackbar'] // Opcional: estilizar se quiser
            });
            this.carregarBloqueios();
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open('Erro ao remover bloqueio. Tente novamente.', 'Fechar', { 
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }
}