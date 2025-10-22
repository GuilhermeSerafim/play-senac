import { Component, inject } from '@angular/core';
import { ViewModeService } from '../../services/view-mode.service';
import { Observable } from 'rxjs';
import { ViewMode } from '../../enum/ViewMode';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-switcher',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './view-switcher.html',
  styleUrl: './view-switcher.scss',
})
export class ViewSwitcher {
  private viewModeService = inject(ViewModeService);
  public currentMode$: Observable<ViewMode> = this.viewModeService.viewMode$;
  public ViewModeEnum = ViewMode;
  constructor(private readonly _router: Router) {}
  selectAdminView(): void {
    this.viewModeService.setViewMode(ViewMode.Admin);
    this._router.navigate(['/home']);
  }

  selectUserView(): void {
    this.viewModeService.setViewMode(ViewMode.User);
    this._router.navigate(['/home']);
  }
}
