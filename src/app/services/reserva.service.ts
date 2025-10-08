import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mockListaDeReservas } from '../mock/allmocks'; // Apenas para a carga inicial
import { ICreateReserva, IReserva } from '../interfaces/ireserva';

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

  addReserva(novaReserva: ICreateReserva): void {
    const listaAtual = this.reservasSubject.getValue();

    // Simula o back-end criando um novo ID.
    // Uma forma simples é pegar o maior ID atual e somar 1.
    const maxId = listaAtual.reduce((max, r) => (r.id > max ? r.id : max), 0);

    const novaReservaComId: IReserva = {
      ...novaReserva,
      id: maxId + 1,
    };

    const novaListaDeReservas: IReserva[] = [...listaAtual, novaReservaComId];
    // Emitindo a nova lista para todos os componentes que estão inscritos
    this.reservasSubject.next(novaListaDeReservas);
  }

  removeReserva(idParaRemover: number): void {
    const listaAtual = this.reservasSubject.getValue();
    const novaListaDeReservas = listaAtual.filter((reserva) => reserva.id !== idParaRemover);
    this.reservasSubject.next(novaListaDeReservas);
  }
}
