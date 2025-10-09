import { Injectable } from '@angular/core';
import { ICourt } from '../interfaces/icourt';
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

  removeCourt(court: ICourt) {}
}
