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

  // Dados do formulário
  usuario: UsuarioDados = {
    nome: '',
    email: '',
    telefone: '',
  };

  // Controle de senha (só envia se o usuário digitar algo novo)
  novaSenha = '';
  hidePassword = true;
  isLoading = true;

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
    this.usuarioService.deletarUsuario().subscribe({
      next: () => {
        this.snackBar.open('User deletado com sucesso!', 'OK', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });

        // DESLOGA AQUI
        this.authService.logout();

        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro ao deletar user', err);
        this.snackBar.open('Erro ao deletar usuário.', 'Fechar', { duration: 3000 });
        this.router.navigate(['/home']);
      },
    });
  }

  onSubmit() {
    // Monta o objeto de atualização
    const payload: UsuarioDados = {
      ...this.usuario,
      // Se digitou senha nova, envia. Se não, envia undefined (ou trata no back)
      senha: this.novaSenha ? this.novaSenha : undefined,
    };

    this.usuarioService.atualizarDados(payload).subscribe({
      next: () => {
        this.snackBar.open('Dados atualizados com sucesso!', 'OK', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.dialogRef.close(true); // Fecha e avisa que salvou
      },
      error: (err) => {
        console.error('Erro ao atualizar', err);
        this.snackBar.open('Erro ao salvar alterações.', 'Fechar', { duration: 3000 });
      },
    });
  }
}
