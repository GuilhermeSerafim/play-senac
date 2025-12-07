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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// 1. IMPORT NOVO
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatSnackBarModule,
    MatProgressSpinnerModule, // 2. ADICIONAR AO IMPORTS
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  hidePassword: boolean = true;
  
  // 3. Variável de controle
  isLoading = false;

  errorMessage = '';
  passwordPattern = '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$';

  constructor() {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.errorMessage = '';
    // 4. Inicia o loading
    this.isLoading = true;

    const payload: CadastroPayload = {
      nome: form.value.nome,
      email: form.value.email,
      senha: form.value.senha,
      telefone: form.value.telefone,
    };

    this.authService.cadastrar(payload).subscribe({
      next: () => {
        // Opcional: manter true aqui para evitar duplo clique enquanto redireciona
        // this.isLoading = false; 

        this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });

        this.router.navigate(['/entre']);
      },
      error: (err) => {
        // 5. Para o loading em caso de erro
        this.isLoading = false;
        
        console.error('Erro no cadastro', err);

        if (err.status === 409 || err.status === 400) {
          this.errorMessage = err.error || 'Dados inválidos';
        } else {
          this.errorMessage = 'Erro ao conectar com o servidor. Tente novamente.';
        }
      },
    });
  }

  temConta() {
    this.router.navigate(['/entre']);
  }
}