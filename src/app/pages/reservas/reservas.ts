import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { ICourtCard } from '../../interfaces/icourt-card';
import { NgClass } from '@angular/common';
import { ProximasReservas } from '../../components/proximas-reservas/proximas-reservas';
import { FacaSuaReserva } from '../../components/faca-sua-reserva/faca-sua-reserva';

@Component({
  selector: 'app-reservas',
  imports: [Header, Footer, NgClass, ProximasReservas, FacaSuaReserva],
  templateUrl: './reservas.html',
  styleUrl: './reservas.scss',
})
export class Reservas {
  courts: ICourtCard[] = [];
  abaAtiva: string = 'proximasReservas';

  ativarAba(str: string) {
    this.abaAtiva = str;
  }
  aoCriarReserva() {
    this.abaAtiva = 'proximasReservas';
  }
}
