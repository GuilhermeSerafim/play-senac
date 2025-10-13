import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICourt } from '../../interfaces/icourt';
import { CourtService } from '../../services/court.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-court',
  imports: [MatIconModule, CommonModule],
  templateUrl: './select-court.html',
  styleUrl: './select-court.scss',
})
export class SelectCourt {
  courts: ICourt[] = [];

  constructor(private courtService: CourtService) {}

  ngOnInit(): void {
    this.courtService.getCourts().subscribe((courts) => (this.courts = courts));
  }

isCourtAvailable(court: ICourt): boolean {
  const now = new Date();

  const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const diaDaSemanaHoje = diasDaSemana[now.getDay()];
  
  if (!court.diasDisponiveis?.includes(diaDaSemanaHoje)) {
    return false; // Se não estiver na lista de dias disponíveis, já retorna falso.
  }

  const horarioAberturaHoje = new Date(now); // Começa com a data de hoje
  horarioAberturaHoje.setHours(
    court.horarioAbertura!.getHours(),
    court.horarioAbertura!.getMinutes(),
    0, 0 // Zera segundos e milissegundos para precisão
  );

  const horarioFechamentoHoje = new Date(now); // Começa com a data de hoje
  horarioFechamentoHoje.setHours(
    court.horarioFechamento!.getHours(),
    court.horarioFechamento!.getMinutes(),
    0, 0 // Zera segundos e milissegundos
  );

  return now >= horarioAberturaHoje && now <= horarioFechamentoHoje;
}
}
