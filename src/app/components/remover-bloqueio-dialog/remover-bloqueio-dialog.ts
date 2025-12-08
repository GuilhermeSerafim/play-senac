import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-remover-bloqueio-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './remover-bloqueio-dialog.html',
  styleUrl: './remover-bloqueio-dialog.scss'
})
export class RemoverBloqueioDialog {
  constructor(public dialogRef: MatDialogRef<RemoverBloqueioDialog>) {}
}