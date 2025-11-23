import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ICreateReserva, IReserva } from '../interfaces/ireserva';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ReservaResponse } from '../interfaces/reserva-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/reservas`;

  // Mantemos o Subject para quem quiser se inscrever (reatividade)
  private readonly reservasSubject = new BehaviorSubject<IReserva[]>([]);
  public readonly reservas$: Observable<IReserva[]> = this.reservasSubject.asObservable();

  constructor() {
    this.loadReservas();
  }

  loadReservas(): void {
    this.http
      .get<ReservaResponse[]>(this.API_URL)
      .pipe(map((listaJava) => listaJava.map((item) => this.adapter(item))))
      .subscribe({
        next: (listaPronta) => this.reservasSubject.next(listaPronta),
        error: (err) => console.error('Erro ao buscar reservas:', err),
      });
  }

  getReservas(): Observable<IReserva[]> {
    return this.reservas$;
  }

  removeReserva(idReserva: number): void {
    this.http.delete(`${this.API_URL}/${idReserva}`).subscribe({
      next: () => {
        this.loadReservas();
      },
      error: (err) => console.error('Erro ao cancelar reserva:', err),
    });
  }

  updateReserva(reserva: IReserva): void {
    // Montamos o payload que o Java espera (apenas dados brutos)
    const payloadJava = {
      dataHoraInicio: this.formatDateForJava(reserva.dataInicio),
      dataHoraFim: this.formatDateForJava(reserva.dataFim),
      idQuadra: reserva.quadra.id, // Importante: Enviamos o ID da quadra
      idUsuario: reserva.usuario.id,
      convidados: reserva.convidados || [],
    };

    this.http.put(`${this.API_URL}/${reserva.id}`, payloadJava).subscribe({
      next: () => this.loadReservas(),
      error: (err) => console.error('Erro ao atualizar reserva:', err),
    });
  }

  addReserva(novaReserva: ICreateReserva): Observable<any> {
    // Montamos o payload que o Java espera receber
    const payloadJava = {
      // Como ICreateReserva geralmente tem o objeto Date, convertemos para String ISO ou formato do Java
      dataHoraInicio: this.formatDateForJava(novaReserva.dataInicio),
      dataHoraFim: this.formatDateForJava(novaReserva.dataFim),
      // Assumindo que no front você tem o ID da quadra e do usuário dentro de novaReserva
      idQuadra: novaReserva.quadraId,
      idUsuario: novaReserva.usuarioId,
      convidados: novaReserva.convidados, // Se houver lógica de convidados, adicione aqui
    };

   return this.http.post(this.API_URL, payloadJava).pipe(
      tap(() => this.loadReservas()) // Recarrega a lista automaticamente no sucesso
    );
  }

  getReservaById(id: number): Observable<IReserva | undefined> {
    return this.reservas$.pipe(map((reservas) => reservas.find((r) => r.id === id)));
  }

  /**
   * Remove todas as reservas associadas a um ID de quadra específico.
   * @param quadraId O ID da quadra que foi removida.
   */
  public removeReservesByCourtId(quadraId: number): void {
    const listaAtual = this.reservasSubject.getValue();

    const novaLista = listaAtual.filter((reserva) => {
      return reserva.quadra.id !== quadraId;
    });

    this.reservasSubject.next(novaLista);
  }

  private adapter(backendData: ReservaResponse): IReserva {
    // ⚠️ ATENÇÃO: Aqui precisamos "montar" o objeto IReserva.
    // Como o back só manda ID (idQuadra), não temos o nome da quadra aqui.
    // Você precisará ajustar isso no Backend depois para mandar o nome.

    return {
      id: backendData.id,

      // Convertendo datas
      dataInicio: new Date(backendData.dataHoraInicio),
      dataFim: new Date(backendData.dataHoraFim),

      // Mapeando IDs (Isso é provisório até seu back retornar o objeto completo)
      quadra: {
        id: backendData.idQuadra,
        title: 'Carregando...', // O back não mandou o nome :(
        // Preencha o resto com dados fictícios ou ajuste sua interface IReserva para aceitar só ID
        pathImg: '',
        capacidade: 0,
        horarioAbertura: null,
        horarioFechamento: null,
        diasDisponiveis: [],
        bloqueada: false,
      } as any,

      usuario: {
        id: backendData.idUsuario,
        name: 'Usuário ' + backendData.idUsuario, // O back não mandou o nome :(
      } as any,

      convidados: backendData.convidados,
    };
  }

  /**
   * Helper para formatar data completa para o Java (YYYY-MM-DDTHH:mm:ss)
   */
  private formatDateForJava(date: Date): string {
    if (!date) return '';

    const d = new Date(date);

    // TRUQUE: Compensar o fuso horário.
    // Subtraímos o deslocamento do fuso para que, ao converter para ISO,
    // ele mostre a hora que o usuário selecionou na tela, e não a hora UTC.
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());

    return d.toISOString().split('.')[0];
  }
}
