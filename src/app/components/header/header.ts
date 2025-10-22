import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewModeService } from '../../services/view-mode.service';
import { ViewMode } from '../../enum/ViewMode';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isAdmin: ViewMode | null = null;

  constructor(private readonly _viewModeService: ViewModeService) {}

  ngOnInit(): void {
    this.isAdmin = this._viewModeService.getCurrentMode();
  }
  ehAdmin() {
    console.log(this.isAdmin);
  }
}
