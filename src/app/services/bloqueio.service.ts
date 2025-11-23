import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBloqueio, ICreateBloqueio } from '../interfaces/ibloqueio';

@Injectable({
  providedIn: 'root'
})
export class BloqueioService {
  private http = inject(HttpClient);
  
  private readonly API_URL = `${environment.apiUrl}/bloqueios`;

  /**
   * Lista todos os bloqueios
   * [GET] /bloqueios
   */
  getAll(): Observable<IBloqueio[]> {
    return this.http.get<IBloqueio[]>(this.API_URL);
  }

  /**
   * Busca um bloqueio específico pelo ID
   * [GET] /bloqueios/{id}
   */
  getById(id: number): Observable<IBloqueio> {
    return this.http.get<IBloqueio>(`${this.API_URL}/${id}`);
  }

  /**
   * Cria um novo bloqueio
   * [POST] /bloqueios
   */
  create(bloqueio: ICreateBloqueio): Observable<IBloqueio> {
    // Dica: Se precisar formatar a data antes de enviar, faça aqui
    // Ex: const payload = { ...bloqueio, dataHoraInicio: format(bloqueio.dataHoraInicio) }
    return this.http.post<IBloqueio>(this.API_URL, bloqueio);
  }

  /**
   * Atualiza um bloqueio existente
   * [PUT] /bloqueios/{id}
   */
  update(id: number, bloqueio: ICreateBloqueio): Observable<IBloqueio> {
    return this.http.put<IBloqueio>(`${this.API_URL}/${id}`, bloqueio);
  }

  /**
   * Remove um bloqueio
   * [DELETE] /bloqueios/{id}
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}