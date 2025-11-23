import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../services/auth.service'; // Importe o novo service
import { ViewModeService } from '../../services/view-mode.service';
import { ViewMode } from '../../enum/ViewMode';
import { PerfilDialog } from '../perfil-dialog/perfil-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(AuthService);
  private viewModeService = inject(ViewModeService);
  private dialog = inject(MatDialog);

  // Observable que diz se está logado (true/false)
  isLoggedIn$ = this.authService.isLoggedIn$;

  // Observable que diz se é admin (para mostrar link do Dashboard)
  isAdmin$ = this.viewModeService.viewMode$.pipe(
    map(mode => mode === ViewMode.Admin)
  );

  sair() {
    this.authService.logout();
  }

  // Novo método para abrir o perfil
  abrirPerfil() {
    this.dialog.open(PerfilDialog, {
      width: '450px',
      panelClass: 'custom-dialog-container' // Opcional para estilos globais
    });
  }
}