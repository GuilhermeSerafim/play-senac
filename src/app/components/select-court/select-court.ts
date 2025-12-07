import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICourt } from '../../interfaces/icourt';
import { CourtService } from '../../services/court.service';
import { CommonModule } from '@angular/common'; // AsyncPipe não é mais necessário aqui
import { DiaDaSemana } from '../../enum/DiaDaSemana';
// 1. Importar o Módulo do Spinner
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-select-court',
  standalone: true,
  imports: [
    MatIconModule, 
    CommonModule, 
    MatProgressSpinnerModule // Adicionado
  ], 
  templateUrl: './select-court.html',
  styleUrl: './select-court.scss',
})
export class SelectCourt implements OnInit {
  // 2. Mudamos de Observable para Array para controlar o loading manualmente
  courts: ICourt[] = [];
  
  // 3. Variável de controle
  isLoading = true;
  
  public diaDaSemanaEnum = DiaDaSemana;

  constructor(private readonly _courtService: CourtService) {}

  ngOnInit(): void {
    // 4. Dispara a busca e controla o spinner
    this.isLoading = true;
    
    this._courtService.getCourts().subscribe({
      next: (data) => {
        this.courts = data;
        this.isLoading = false; // Desliga ao receber dados
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false; // Desliga mesmo se der erro
      }
    });
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
    const diaHoje = now.getDay(); 

    const hojeEDiaDisponivel = court.diasDisponiveis.includes(diaHoje);

    if (!hojeEDiaDisponivel) {
      return false;
    }

    const horarioAberturaHoje = new Date(now);
    horarioAberturaHoje.setHours(
      new Date(court.horarioAbertura).getHours(), // Garante conversão se vier string
      new Date(court.horarioAbertura).getMinutes(),
      0,
      0 
    );

    const horarioFechamentoHoje = new Date(now);
    horarioFechamentoHoje.setHours(
      new Date(court.horarioFechamento).getHours(),
      new Date(court.horarioFechamento).getMinutes(),
      0,
      0
    );

    return now >= horarioAberturaHoje && now <= horarioFechamentoHoje;
  }
}