import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsuarioDados {
  nome: string;
  email: string;
  telefone: string;
  senha?: string; // Opcional no envio (só se quiser trocar)
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/usuarios`;

  /**
   * Busca os dados do usuário logado (baseado no Token)
   * Rota: GET /usuarios/buscar
   */
  buscarDados(): Observable<UsuarioDados> {
    return this.http.get<UsuarioDados>(`${this.API_URL}/buscar`);
  }

  /**
   * Atualiza os dados cadastrais
   * Rota sugerida: PUT /usuarios/alterar
   */
  atualizarDados(dados: UsuarioDados): Observable<any> {
    return this.http.put(`${this.API_URL}/atualizar`, dados);
  }

  deletarUsuario(): Observable<any> {
    return this.http.delete(`${this.API_URL}/deletar/`);
  }
}
