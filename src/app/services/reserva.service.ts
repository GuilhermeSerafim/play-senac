import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mockListaDeReservas } from '../mock/allmocks'; // Apenas para a carga inicial
import { IReserva } from '../interfaces/ireserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private reservasSubject = new BehaviorSubject<IReserva[]>(mockListaDeReservas);

  public reservas$: Observable<IReserva[]> = this.reservasSubject.asObservable();

  constructor() {}

  getReservas(): Observable<IReserva[]> {
    return this.reservas$;
  }

  addReserva(novaReserva: IReserva) {
    const listaAtual = this.reservasSubject.getValue();
    const novaLista = [...listaAtual, novaReserva];
    this.reservasSubject.next(novaLista);
  }
}
