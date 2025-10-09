import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Quadras } from "../../components/quadras/quadras";

@Component({
  selector: 'app-dashboard',
  imports: [Header, Footer, FormsModule, CommonModule, Quadras],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  abaAtiva: string = 'quadras';
  ativarAba(aba: string) {
    this.abaAtiva = aba;
  }
}
