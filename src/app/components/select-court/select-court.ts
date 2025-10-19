import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICourt } from '../../interfaces/icourt';
import { CourtService } from '../../services/court.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DiaDaSemana } from '../../enum/DiaDaSemana';

@Component({
  selector: 'app-select-court',
  imports: [MatIconModule, CommonModule, AsyncPipe],
  templateUrl: './select-court.html',
  styleUrl: './select-court.scss',
})
export class SelectCourt {
  courts$!: Observable<ICourt[]>;
  public diaDaSemanaEnum = DiaDaSemana;

  constructor(private readonly _courtService: CourtService) {}

  ngOnInit(): void {
    this.courts$ = this._courtService.getCourts();
  }

  /**
   * Verifica se uma quadra está disponível no momento atual.
   * @param court O objeto da quadra a ser verificado.
   * @returns {boolean} True se a quadra estiver aberta agora, caso contrário, false.
   */
  isCourtAvailable(court: ICourt): boolean {
    if (!court.diasDisponiveis || !court.horarioAbertura || !court.horarioFechamento) {
      return false;
    }

    const now = new Date();
    const diaHoje = now.getDay(); // Retorna um NÚMERO (0 para Domingo, 1 para Segunda, etc.)

    const hojeEDiaDisponivel = court.diasDisponiveis.includes(diaHoje);

    if (!hojeEDiaDisponivel) {
      return false;
    }

    const horarioAberturaHoje = new Date(now);
    horarioAberturaHoje.setHours(
      court.horarioAbertura.getHours(),
      court.horarioAbertura.getMinutes(),
      0,
      0 // Zera segundos e milissegundos para uma comparação precisa
    );

    const horarioFechamentoHoje = new Date(now);
    horarioFechamentoHoje.setHours(
      court.horarioFechamento.getHours(),
      court.horarioFechamento.getMinutes(),
      0,
      0
    );

    return now >= horarioAberturaHoje && now <= horarioFechamentoHoje;
  }
}
