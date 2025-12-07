import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioService, UsuarioDados } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// 1. IMPORT DO SPINNER
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-perfil-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule // 2. ADICIONAR AO ARRAY
  ],
  templateUrl: './perfil-dialog.html',
  styleUrl: './perfil-dialog.scss',
})
export class PerfilDialog implements OnInit {
  private usuarioService = inject(UsuarioService);
  private dialogRef = inject(MatDialogRef<PerfilDialog>);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private authService = inject(AuthService);
  passwordPattern = '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$';

  usuario: UsuarioDados = {
    nome: '',
    email: '',
    telefone: '',
  };

  novaSenha = '';
  hidePassword = true;

  // 3. ESTADOS DE CARREGAMENTO SEPARADOS
  isLoading = true;   // Carregamento inicial da tela
  isSaving = false;   // Spinner do botão Salvar
  isDeleting = false; // Spinner do botão Excluir

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.isLoading = true;
    this.usuarioService.buscarDados().subscribe({
      next: (dados) => {
        this.usuario = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar perfil', err);
        this.snackBar.open('Erro ao carregar informações.', 'Fechar', { duration: 3000 });
        this.dialogRef.close();
      },
    });
  }

  onDeleteUser() {
    // 4. Ativa o loading de deletar
    this.isDeleting = true;

    this.usuarioService.deletarUsuario().subscribe({
      next: () => {
        this.snackBar.open('User deletado com sucesso!', 'OK', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.authService.logout();
        this.dialogRef.close(true);
      },
      error: (err) => {
        // Para loading
        this.isDeleting = false;
        
        console.error('Erro ao deletar user', err);
        this.snackBar.open('Erro ao deletar usuário.', 'Fechar', { duration: 3000 });
        this.router.navigate(['/home']);
      },
    });
  }

  onSubmit() {
    // 5. Ativa o loading de salvar
    this.isSaving = true;

    const payload: UsuarioDados = {
      ...this.usuario,
      senha: this.novaSenha ? this.novaSenha : undefined,
    };

    this.usuarioService.atualizarDados(payload).subscribe({
      next: () => {
        this.snackBar.open('Dados atualizados com sucesso!', 'OK', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        // Para loading
        this.isSaving = false;
        
        console.error('Erro ao atualizar', err);
        this.snackBar.open('Erro ao salvar alterações.', 'Fechar', { duration: 3000 });
      },
    });
  }
}