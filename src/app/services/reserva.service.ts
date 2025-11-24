import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ICreateReserva, IReserva } from '../interfaces/ireserva';
import { environment } from '../../environments/environment'; // Use o genérico para prod/dev
import { ReservaResponse } from '../interfaces/reserva-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/reservas`;

  // O Subject é útil para atualizações em tempo real (ex: após criar/deletar),
  // mas para listagens específicas (Admin vs User), vamos retornar Observables diretos.
  // Isso evita que o Admin veja "Minhas Reservas" sem querer e vice-versa.
  private readonly reservasSubject = new BehaviorSubject<IReserva[]>([]);
  public readonly reservas$: Observable<IReserva[]> = this.reservasSubject.asObservable();

  constructor() {}

  /**
   * ADMIN: Busca TODAS as reservas do sistema.
   * Rota: GET /reservas
   */
  getAllReservas(): Observable<IReserva[]> {
    return this.http
      .get<ReservaResponse[]>(this.API_URL)
      .pipe(map((listaJava) => listaJava.map((item) => this.adapter(item))));
  }

  /**
   * USUÁRIO: Busca apenas as reservas do usuário logado.
   * Rota: GET /reservas/minhas
   */
  getMinhasReservas(): Observable<IReserva[]> {
    return this.http.get<ReservaResponse[]>(`${this.API_URL}/minhas`).pipe(
      map((listaJava) => listaJava.map((item) => this.adapter(item))),
      // Opcional: Atualiza o subject se você usar ele em algum lugar global
      tap((reservas) => this.reservasSubject.next(reservas))
    );
  }

  getReservaById(id: number): Observable<IReserva | undefined> {
    // Busca do endpoint específico se existir, ou filtra da lista local
    return this.http
      .get<ReservaResponse>(`${this.API_URL}/${id}`)
      .pipe(map((item) => this.adapter(item)));
  }

  addReserva(novaReserva: ICreateReserva): Observable<any> {
    const payloadJava = {
      dataHoraInicio: this.formatDateForJava(novaReserva.dataInicio),
      dataHoraFim: this.formatDateForJava(novaReserva.dataFim),
      idQuadra: novaReserva.quadraId,
      // idUsuario: O Backend pega do Token, não precisa mandar se o Spring Security estiver configurado
      convidados: novaReserva.convidados || [],
    };

    return this.http.post(this.API_URL, payloadJava);
  }

  updateReserva(reserva: IReserva): Observable<any> {
    const payloadJava = {
      dataHoraInicio: this.formatDateForJava(reserva.dataInicio),
      dataHoraFim: this.formatDateForJava(reserva.dataFim),
      idQuadra: reserva.quadra.id,
      idUsuario: reserva.usuario.id,
      convidados: reserva.convidados || [],
    };

    return this.http.put(`${this.API_URL}/${reserva.id}`, payloadJava);
  }

  removeReserva(idReserva: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${idReserva}`);
  }

  // --- ADAPTER E HELPERS ---

  private adapter(backendData: ReservaResponse): IReserva {
    return {
      id: backendData.id,
      dataInicio: new Date(backendData.dataHoraInicio),
      dataFim: new Date(backendData.dataHoraFim),

      // Objeto parcial para ser hidratado no componente
      quadra: {
        id: backendData.idQuadra,
        title: 'Carregando...',
        pathImg: '',
        capacidade: 0,
        horarioAbertura: null,
        horarioFechamento: null,
        diasDisponiveis: [],
        bloqueada: false,
      } as any,

      usuario: {
        id: backendData.idUsuario,
        name: 'Usuário ' + backendData.idUsuario,
      } as any,

      convidados: backendData.convidados || [],
    };
  }

  private formatDateForJava(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('.')[0];
  }
}
