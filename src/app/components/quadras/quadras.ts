import { Component, Input, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CourtService } from '../../services/court.service';
import { MatDialog } from '@angular/material/dialog';
import { CancelarReservaAdmDialog } from '../cancelar-reserva-adm-dialog/cancelar-reserva-adm-dialog';
import { AlterQuadraAdmDialog } from '../alter-reserva-adm-dialog/alter-quadra-adm-dialog';

@Component({
  selector: 'app-quadras',
  imports: [MatIcon, CommonModule, DatePipe],
  templateUrl: './quadras.html',
  styleUrl: './quadras.scss',
})
export class Quadras {
  @Input({ required: true }) courts: ICourt[] = [];
  quadraSelecionada: ICourt = {} as ICourt;

  constructor(private readonly _courtService: CourtService, private readonly _dialog: MatDialog) {}

  removeQuadra(q: ICourt) {
    const dialogRef = this._dialog.open(CancelarReservaAdmDialog, {
      width: '540px',
    });
    dialogRef.afterClosed().subscribe((remove) => remove && this._courtService.removeCourt(q));
  }

  alterarQuadra(quadra: ICourt) {
    const dialogRef = this._dialog.open(AlterQuadraAdmDialog, {
      width: '540px',
      data: quadra,
    });
    dialogRef.afterClosed().subscribe((result) => result && this._courtService.updateCourt(result));
  }
}
