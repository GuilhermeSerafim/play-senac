import { Component, inject } from '@angular/core';
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
import { AuthService, CadastroPayload } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Para feedback visual

@Component({
  selector: 'app-cadastro',
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
    MatSnackBarModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar); // Para mostrar mensagens de erro/sucesso

  hidePassword: boolean = true;
  
  // Variável para mostrar erro vindo do back (ex: "Email já existe")
  errorMessage = '';

  constructor() {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    // Limpa erros anteriores
    this.errorMessage = '';

    const payload: CadastroPayload = {
      nome: form.value.nome,
      email: form.value.email,
      senha: form.value.senha,
      telefone: form.value.telefone
    };

    this.authService.cadastrar(payload).subscribe({
      next: () => {
        // Sucesso!
        this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        
        // Redireciona para o Login
        this.router.navigate(['/entre']);
      },
      error: (err) => {
        console.error('Erro no cadastro', err);
        
        // Tenta pegar a mensagem do back-end, senão usa uma genérica
        if (err.status === 409 || err.status === 400) {
           this.errorMessage = err.error?.message || 'Dados inválidos ou e-mail já cadastrado.';
        } else {
           this.errorMessage = 'Erro ao conectar com o servidor. Tente novamente.';
        }
      }
    });
  }

  temConta() {
    this.router.navigate(['/entre']);
  }
}