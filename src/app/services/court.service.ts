import { Injectable } from '@angular/core';
import { ICourt, ICreateCourt } from '../interfaces/icourt';
import { BehaviorSubject, Observable } from 'rxjs';
import { mockListaDeQuadras } from '../mock/allmocks';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  private courtSubject = new BehaviorSubject<ICourt[]>(mockListaDeQuadras);
  public court$: Observable<ICourt[]> = this.courtSubject.asObservable();
  
  getCourts(): Observable<ICourt[]> {
    return this.court$;
  }

  removeCourt(court: ICourt): void {
    const listaAtual = this.courtSubject.getValue();
    const novaListaDeQuadras = listaAtual.filter((quadra) => quadra.title !== court.title);
    this.courtSubject.next(novaListaDeQuadras);
  }

  addCourt(quadra: ICreateCourt): void {
    const listaAtual = this.courtSubject.getValue();
    const maxId = listaAtual.reduce((max, r) => (r.id > max ? r.id : max), 0);
    const novaQuadraComId: ICourt = {
      ...quadra,
      id: maxId + 1,
    };

    const novaListaDeQuadras: ICourt[] = [...listaAtual, novaQuadraComId];
    this.courtSubject.next(novaListaDeQuadras);
  }

  updateCourt(updatedCourt: ICourt): void {
    const currentCourts = this.courtSubject.getValue();
    const newCourtsList = currentCourts.map((court) =>
      court.id === updatedCourt.id ? updatedCourt : court
    );
    this.courtSubject.next(newCourtsList);
  }
}
