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

// Interface interna para exibição "Hidratada" (com dados visuais da quadra)
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
    MatIconModule
  ],
  templateUrl: './bloqueios-adm.html',
  styleUrl: './bloqueios-adm.scss'
})
export class BloqueiosAdm implements OnInit {
  private bloqueioService = inject(BloqueioService);
  private courtService = inject(CourtService);
  private snackBar = inject(MatSnackBar);

  bloqueios$!: Observable<IBloqueioDisplay[]>;

  ngOnInit() {
    this.carregarBloqueios();
  }

  carregarBloqueios() {
    // Combina Bloqueios e Quadras para mostrar o nome da quadra no card
    this.bloqueios$ = combineLatest([
      this.bloqueioService.getAll(),
      this.courtService.getCourts()
    ]).pipe(
      map(([bloqueios, quadras]) => {
        return bloqueios.map(bloqueio => {
          // Encontra a quadra correspondente para pegar nome e imagem
          const quadra = quadras.find(q => q.id === bloqueio.idQuadra);
          
          return {
            ...bloqueio,
            // Hidratação dos dados visuais
            nomeQuadra: quadra?.title || `Quadra #${bloqueio.idQuadra}`,
            imgQuadra: quadra?.pathImg || 'images/Complexo Esportivo no Parque Urbano.png',
            
            // Garante que as datas sejam objetos Date (caso venham como string do JSON)
            dataHoraInicio: new Date(bloqueio.dataHoraInicio),
            dataHoraFim: new Date(bloqueio.dataHoraFim)
          };
        })
        // Ordena: Mais recentes primeiro (ou mais próximos)
        .sort((a, b) => a.dataHoraInicio.getTime() - b.dataHoraInicio.getTime());
      })
    );
  }

  removerBloqueio(id: number) {
    if(confirm('Tem certeza que deseja desbloquear este horário?')) {
      this.bloqueioService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Bloqueio removido com sucesso!', 'OK', { duration: 3000 });
          this.carregarBloqueios(); // Recarrega a lista para atualizar a tela
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Erro ao remover bloqueio.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}