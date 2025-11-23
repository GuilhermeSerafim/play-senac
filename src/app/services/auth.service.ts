import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject guarda o estado atual. Inicia false (deslogado).
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  // Verifica se tem token no localStorage ao iniciar
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Chamado pelo componente de Login após sucesso
  loginSuccess(token: string, role: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', userId);
    
    // Avisa todo mundo que logou
    this.isLoggedInSubject.next(true); 
  }

  // Método de SAIR
  logout() {
    // 1. Limpa o storage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');

    // 2. Avisa todo mundo que deslogou
    this.isLoggedInSubject.next(false);

    // 3. Redireciona para home ou login
    this.router.navigate(['/home']);
  }

  // Helper para saber se está logado sem se inscrever
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}