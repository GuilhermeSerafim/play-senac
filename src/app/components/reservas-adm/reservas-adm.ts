import { Component, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { combineLatest } from 'rxjs'; // Removemos map, startWith, etc pois faremos manual
import { CourtService } from '../../services/court.service';
import { ReservaService } from '../../services/reserva.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common'; // Adicione CommonModule se faltar
import { MatIcon } from '@angular/material/icon';
import { CancelarReservaDialog } from '../cancelar-reserva-dialog/cancelar-reserva-dialog';
import { AlterReservaAdmDialog } from '../alter-reserva-adm-dialog/alter-reserva-adm-dialog';
import { IReserva } from '../../interfaces/ireserva';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // <--- Import Novo

@Component({
  selector: 'app-reservas-adm',
  standalone: true,
  imports: [
    CommonModule, // Importante para *ngIf e @for
    DatePipe, 
    MatIcon, 
    TitleCasePipe, 
    MatDialogModule, 
    MatProgressSpinnerModule,
    MatPaginatorModule // <--- Import Novo
  ],
  templateUrl: './reservas-adm.html',
  styleUrl: './reservas-adm.scss',
})
export class ReservasAdm implements OnInit {
  // 1. Variáveis de Dados
  allReservas: IReserva[] = [];       // Todos os dados do banco
  paginatedReservas: IReserva[] = []; // Apenas os dados da página atual
  
  // 2. Controle de Loading
  isLoading = true;

  // 3. Configuração da Paginação
  totalItems = 0;
  pageSize = 5; // Quantos cards por página
  pageIndex = 0; // Página atual (começa em 0)
  pageSizeOptions = [5, 10, 25, 50];

  constructor(
    private readonly _courtService: CourtService,
    private readonly _reservaService: ReservaService,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.isLoading = true;

    combineLatest([
      this._courtService.getCourts(),
      this._reservaService.getAllReservas(),
    ]).subscribe({
      next: ([listaQuadras, listaReservas]) => {
        // Lógica de Hidratação (igual ao seu código anterior)
        const reservasHidratadas = listaReservas.map((reserva) => {
          const infoDaQuadra = listaQuadras.find((q) => q.id === reserva.quadra.id);
          return {
            ...reserva,
            quadra: {
              ...reserva.quadra,
              title: infoDaQuadra?.title || `Quadra #${reserva.quadra.id}`,
              pathImg: infoDaQuadra?.pathImg || 'assets/img/default.png',
              capacidade: infoDaQuadra?.capacidade || 0,
              horarioAbertura: infoDaQuadra?.horarioAbertura,
              horarioFechamento: infoDaQuadra?.horarioFechamento,
              diasDisponiveis: infoDaQuadra?.diasDisponiveis || [],
              bloqueada: infoDaQuadra?.bloqueada || false,
            },
            // Garante que sejam objetos Date para ordenação
            dataInicio: new Date(reserva.dataInicio), 
            dataFim: new Date(reserva.dataFim)
          } as IReserva;
        }).sort((a, b) => b.dataInicio.getTime() - a.dataInicio.getTime());

        // 4. Salva os dados e configura paginação inicial
        this.allReservas = reservasHidratadas;
        this.totalItems = this.allReservas.length;
        this.atualizarPagina(); // Corta o array para a primeira página
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar', err);
        this.isLoading = false;
      }
    });
  }

  // 5. Método chamado pelo <mat-paginator> quando o usuário muda de página
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.atualizarPagina();
  }

  // 6. Lógica de "Fatiar" (Slice) o array
  atualizarPagina() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedReservas = this.allReservas.slice(startIndex, endIndex);
  }

  cancelarReserva(idReserva: number) {
    const dialogRef = this._dialog.open(CancelarReservaDialog, { width: '540px' });
    dialogRef.afterClosed().subscribe((confirmou) => {
      if (confirmou) {
        this._reservaService.removeReserva(idReserva).subscribe(() => {
          // Recarrega os dados sem reload total da página
          this.carregarDados(); 
        });
      }
    });
  }

  alterarQuadra(reserva: IReserva) {
    const dialogRef = this._dialog.open(AlterReservaAdmDialog, {
      width: '540px',
      data: reserva,
    });
    dialogRef.afterClosed().subscribe((reservaEditada) => {
      if (reservaEditada) {
        this._reservaService.updateReserva(reservaEditada).subscribe(() => {
          this.carregarDados();
        });
      }
    });
  }
}