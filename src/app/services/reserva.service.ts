import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICreateReserva, IReserva } from '../interfaces/ireserva';
import { mockListaDeReservas } from '../mock/reserva.mocks';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private readonly reservasSubject = new BehaviorSubject<IReserva[]>(mockListaDeReservas);

  public readonly reservas$: Observable<IReserva[]> = this.reservasSubject.asObservable();

  getReservas(): Observable<IReserva[]> {
    return this.reservas$;
  }

  addReserva(novaReserva: ICreateReserva): void {
    const currentReservas = this.reservasSubject.getValue();

    const maxId = currentReservas.reduce((max, r) => (r.id > max ? r.id : max), 0);
    const novaReservaComId: IReserva = {
      ...novaReserva,
      id: maxId + 1,
    };

    this.reservasSubject.next([...currentReservas, novaReservaComId]);
  }

  removeReserva(idParaRemover: number): void {
    const currentReservas = this.reservasSubject.getValue();
    const updatedReservas = currentReservas.filter((reserva) => reserva.id !== idParaRemover);
    this.reservasSubject.next(updatedReservas);
  }

  updateReserva(reservaAtualizada: IReserva): void {
    const currentReservas = this.reservasSubject.getValue();
    const updatedReservas = currentReservas.map((reserva) =>
      reserva.id === reservaAtualizada.id ? reservaAtualizada : reserva
    );
    this.reservasSubject.next(updatedReservas);
  }

  getReservaById(id: number): Observable<IReserva | undefined> {
    return this.reservas$.pipe(map((reservas) => reservas.find((r) => r.id === id)));
  }
}
