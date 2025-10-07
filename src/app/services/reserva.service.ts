import { Injectable } from '@angular/core';
import { mockListaDeReservas } from '../mock/allmocks';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  getReservas() {
    return mockListaDeReservas;
  }
}
