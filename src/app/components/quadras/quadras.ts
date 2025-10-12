import { Component, Input, OnInit } from '@angular/core';
import { ICourt } from '../../interfaces/icourt';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CourtService } from '../../services/court.service';
import { MatDialog } from '@angular/material/dialog';
import { CancelarReservaAdmDialog } from '../cancelar-reserva-adm-dialog/cancelar-reserva-adm-dialog';
import { AlterReservaAdmDialog } from '../alter-reserva-adm-dialog/alter-reserva-adm-dialog';

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
    const dialogRef = this._dialog.open(AlterReservaAdmDialog, {
      width: '540px',
      // Isso significa que ele copia todos os valores do objeto, incluindo objetos aninhados, etc.
      // Criando novas referências em vez de apenas apontar para os mesmos endereços de memória.
      data: structuredClone(quadra),
    });
    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }
}
