import { Component, ElementRef, inject } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ViewModeService } from '../../services/view-mode.service';
import { ViewMode } from '../../enum/ViewMode';
import { LoginResponse } from '../../interfaces/login-response.interface';
import { AuthService } from '../../services/auth.service';
// 1. IMPORTANTE: Importar o módulo do Spinner
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-entre',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Header,
    Footer,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule, // 2. Adicionar aos imports
  ],
  templateUrl: './entre.html',
  styleUrl: './entre.scss',
})
export class Entre {
  private http = inject(HttpClient);
  private viewModeService = inject(ViewModeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginError = '';
  public hidePassword = true;
  
  // 3. Variável de controle de carregamento
  public isLoading = false;

  private readonly API_URL = `${environment.apiUrl}/login`;

  passwordPattern = '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$';

  constructor(private readonly _el: ElementRef) {}

  aoClicarEmCriarUmaConta() {
    this.router.navigate(['/cadastro']);
  }

  aoEsquecerASenha() {
    console.log('Clicou em Esqueceu a Senha');
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.focusOnInvalidControl(form);
      return;
    }

    this.loginError = '';
    // 4. Ativa o loading
    this.isLoading = true;

    const payload = {
      email: form.value.email,
      senha: form.value.senha,
    };

    this.http.post<LoginResponse>(this.API_URL, payload).subscribe({
      next: (response) => {
        // Opcional: Se o redirect for muito rápido, nem precisa setar false, 
        // mas é boa prática caso o roteamento demore.
        this.isLoading = false; 

        this.authService.loginSuccess(response.token, response.role);

        if (response.role === 'ADMIN') {
          this.viewModeService.setViewMode(ViewMode.Admin);
          this.router.navigate(['/dashboard']);
        } else {
          this.viewModeService.setViewMode(ViewMode.User);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        // 5. Desativa o loading em caso de erro para o usuário tentar de novo
        this.isLoading = false; 
        
        console.error('Erro no login', err);
        if (err.status === 401 || err.status === 403) {
          this.loginError = 'E-mail ou senha inválidos.';
        } else {
          this.loginError = 'Erro no servidor. Tente novamente mais tarde.';
        }
      },
    });
  }

  focusOnInvalidControl(form: NgForm) {
    for (const control in form.controls) {
      const invalidControl: HTMLElement = this._el.nativeElement.querySelector(`[name=${control}]`);
      if (invalidControl) invalidControl.focus();
      break;
    }
  }
}