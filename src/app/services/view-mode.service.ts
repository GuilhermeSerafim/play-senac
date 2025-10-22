import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ViewMode } from '../enum/ViewMode';

// Chave par ausar no localStorage
const STORAGE_KEY = 'playSenacViewMode';

@Injectable({
  providedIn: 'root',
})
export class ViewModeService {
  private readonly viewModeSubject: BehaviorSubject<ViewMode>;

  public viewMode$: Observable<ViewMode>;

  constructor() {
    const storedMode = localStorage.getItem(STORAGE_KEY) as ViewMode;
    const initiaMode =
      storedMode && Object.values(ViewMode).includes(storedMode) ? storedMode : ViewMode.User;
    this.viewModeSubject = new BehaviorSubject<ViewMode>(initiaMode);
    this.viewMode$ = this.viewModeSubject.asObservable();
  }

  /**
   * Define o modo de visualização atual.
   * Atualiza o BehaviorSubject (notificando inscritos) e o localStorage (para persistência).
   * @param mode O novo modo ('admin' ou 'user')
   */
  setViewMode(mode: ViewMode): void {
    if (Object.values(ViewMode).includes(mode)) {
      localStorage.setItem(STORAGE_KEY, mode);
      this.viewModeSubject.next(mode);
    } else {
      console.error('Modo de visualização inválido: ', mode);
    }
  }

  /**
   * Retorna o valor atual do modo de visualização (não reativo).
   * Útil para verificações pontuais se necessário.
   */
  getCurrentMode(): ViewMode {
    return this.viewModeSubject.getValue();
  }
}
