import { Component, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { combineLatest, map, Observable, startWith, switchMap } from 'rxjs';
import { CourtService } from '../../services/court.service';
import { ReservaService } from '../../services/reserva.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CancelarReservaDialog } from '../cancelar-reserva-dialog/cancelar-reserva-dialog';
import { AlterReservaAdmDialog } from '../alter-reserva-adm-dialog/alter-reserva-adm-dialog';
import { IReserva } from '../../interfaces/ireserva';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-reservas-adm',
  standalone: true,
  imports: [DatePipe, MatIcon, TitleCasePipe, MatDialogModule, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './reservas-adm.html',
  styleUrl: './reservas-adm.scss',
})
export class ReservasAdm implements OnInit {
  reservasCombinadas$!: Observable<IReserva[] | null>;

  // Subject para forçar recarregamento manual (refresh)
  private refresh$ = new Observable<void>((observer) => observer.next());

  constructor(
    private readonly _courtService: CourtService,
    private readonly _reservaService: ReservaService,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Usamos combineLatest para cruzar Quadras (para pegar imagens) e Reservas (todas)
    this.reservasCombinadas$ = combineLatest([
      this._courtService.getCourts(), // Fluxo 1: Lista de Quadras
      this._reservaService.getAllReservas(), // Fluxo 2: Lista de TODAS as Reservas (Endpoint Admin)
    ]).pipe(
      map(([listaQuadras, listaReservas]) => {
        return (
          listaReservas
            .map((reserva) => {
              // Hidratação: Acha a quadra pelo ID para pegar nome e imagem
              const infoDaQuadra = listaQuadras.find((q) => q.id === reserva.quadra.id);

              return {
                ...reserva,
                quadra: {
                  ...reserva.quadra,
                  title: infoDaQuadra?.title || `Quadra #${reserva.quadra.id}`,
                  pathImg: infoDaQuadra?.pathImg || 'assets/img/default.png', // Caminho seguro
                  capacidade: infoDaQuadra?.capacidade || 0,
                  // Preenche campos obrigatórios da interface com valores seguros
                  horarioAbertura: infoDaQuadra?.horarioAbertura || undefined,
                  horarioFechamento: infoDaQuadra?.horarioFechamento || undefined,
                  diasDisponiveis: infoDaQuadra?.diasDisponiveis || [],
                  bloqueada: infoDaQuadra?.bloqueada || false,
                },
              } as IReserva;
            }).sort((a, b) => b.dataInicio.getTime() - a.dataInicio.getTime())
        );
      }),
      startWith(null)
    );
  }

  cancelarReserva(idReserva: number) {
    const dialogRef = this._dialog.open(CancelarReservaDialog, {
      width: '540px',
    });

    dialogRef.afterClosed().subscribe((confirmou) => {
      if (confirmou) {
        this._reservaService.removeReserva(idReserva).subscribe(() => {
          // Truque simples para recarregar a página/lista após deletar
          // Em produção idealmente usaríamos um BehaviorSubject para recarregar sem F5
          window.location.reload();
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
          window.location.reload(); // Recarrega para mostrar dados novos
        });
      }
    });
  }
}
