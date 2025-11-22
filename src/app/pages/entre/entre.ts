import { Component, ElementRef, inject } from '@angular/core'; // Adicionei inject
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
import { HttpClient } from '@angular/common/http'; // <--- Importante
import { environment } from '../../../environments/environment'; // <--- Importante
import { ViewModeService } from '../../services/view-mode.service';
import { ViewMode } from '../../enum/ViewMode';
import { LoginResponse } from '../../interfaces/login-response.interface'; // Crie essa interface se não criou ainda

@Component({
  selector: 'app-entre',
  standalone: true, // Confirmei que é standalone
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
  ],
  templateUrl: './entre.html',
  styleUrl: './entre.scss',
})
export class Entre {
  // Injeção de dependências moderna
  private http = inject(HttpClient);
  private viewModeService = inject(ViewModeService);
  
  // Propriedade para mostrar erro na tela se a senha estiver errada
  public loginError = ''; 
  public hidePassword = true;
  
  // URL do endpoint de login (ajuste se for diferente no Java, ex: /auth/login)
  private readonly API_URL = `${environment.apiUrl}/login`; 

  constructor(private readonly _el: ElementRef, private readonly _router: Router) {}

  aoClicarEmCriarUmaConta() {
    this._router.navigate(['/cadastro']);
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

    const payload = {
      email: form.value.email,
      senha: form.value.senha 
    };

    this.http.post<LoginResponse>(this.API_URL, payload).subscribe({
      next: (response) => {

        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.role);

        if (response.role === 'ADMIN') {
          this.viewModeService.setViewMode(ViewMode.Admin);
          this._router.navigate(['/dashboard']);
        } else {
          this.viewModeService.setViewMode(ViewMode.User);
          this._router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Erro no login', err);
        if (err.status === 401 || err.status === 403) {
          this.loginError = 'E-mail ou senha inválidos.';
        } else {
          this.loginError = 'Erro no servidor. Tente novamente mais tarde.';
        }
      }
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