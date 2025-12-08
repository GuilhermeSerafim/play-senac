import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs'; // Adicione shareReplay para performance
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; // IMPORTANTE

import { AuthService } from '../../services/auth.service';
import { ViewModeService } from '../../services/view-mode.service';
import { ViewMode } from '../../enum/ViewMode';
import { PerfilDialog } from '../perfil-dialog/perfil-dialog';

// Material Imports
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';   // Novo
import { MatButtonModule } from '@angular/material/button'; // Novo
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    AsyncPipe, 
    MatIconModule, 
    MatMenuModule, 
    MatButtonModule,
    MatDivider
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(AuthService);
  private viewModeService = inject(ViewModeService);
  private dialog = inject(MatDialog);
  private breakpointObserver = inject(BreakpointObserver); // Injeção do CDK

  // Detecta se é celular (Handset)
  isMobile$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay() // Boa prática: evita recalcular para cada async pipe no HTML
    );

  isLoggedIn$ = this.authService.isLoggedIn$;

  isAdmin$ = this.viewModeService.viewMode$.pipe(
    map(mode => mode === ViewMode.Admin)
  );

  sair() {
    this.authService.logout();
  }

  abrirPerfil() {
    this.dialog.open(PerfilDialog, {
      width: '450px',
      panelClass: 'custom-dialog-container'
    });
  }
}