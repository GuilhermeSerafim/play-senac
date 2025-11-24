import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // <--- Importe isso
import { environment } from '../../environments/environment'; // <--- Importe isso

// Definição da interface do Payload (pode ficar aqui ou em arquivo separado)
export interface CadastroPayload {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Injeção de dependências (HttpClient é essencial para falar com o Java)
  private http = inject(HttpClient); 
  private router = inject(Router);
  
  // URL base do seu backend (ajuste conforme sua API Java)
  // Ex: http://localhost:8080/usuarios
  private readonly API_URL = `${environment.apiUrl}/usuarios`; 

  // ... (Seu código existente de isLoggedInSubject e hasToken) ...
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {} // Router já foi injetado via inject() acima, pode tirar do construtor se quiser

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // ... (Seus métodos loginSuccess e logout continuam iguais) ...
  loginSuccess(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    this.isLoggedInSubject.next(true); 
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  // --- NOVO MÉTODO: CADASTRAR ---
  /**
   * Envia os dados do formulário para o Back-end criar o usuário.
   * Retorna um Observable que o componente pode usar para saber se deu certo ou errado.
   */
  cadastrar(dados: CadastroPayload): Observable<any> {
    // Faz um POST para http://localhost:8080/usuarios/cadastro
    // O Java espera receber o JSON igual ao CadastroPayload
    return this.http.post(`${this.API_URL}/cadastro`, dados);
  }
}