import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../services/auth.service'; // Importe o novo service
import { ViewModeService } from '../../services/view-mode.service';
import { ViewMode } from '../../enum/ViewMode';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(AuthService);
  private viewModeService = inject(ViewModeService);

  // Observable que diz se está logado (true/false)
  isLoggedIn$ = this.authService.isLoggedIn$;

  // Observable que diz se é admin (para mostrar link do Dashboard)
  isAdmin$ = this.viewModeService.viewMode$.pipe(
    map(mode => mode === ViewMode.Admin)
  );

  sair() {
    this.authService.logout();
  }
}