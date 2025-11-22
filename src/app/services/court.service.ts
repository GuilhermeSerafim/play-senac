import { Injectable } from '@angular/core';
import { ICourt, ICreateCourt } from '../interfaces/icourt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ReservaService } from './reserva.service';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CourtResponse } from '../interfaces/court-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CourtService {

  private readonly API_URL = `${environment.apiUrl}/quadras`;

  private courtSubject = new BehaviorSubject<ICourt[]>([]);
  public court$: Observable<ICourt[]> = this.courtSubject.asObservable();
  
  constructor(private readonly http: HttpClient){
    this.loadCourts();
  }

  loadCourts() {
    this.http.get<CourtResponse[]>(this.API_URL)
    .pipe(
      map((listaJava) => listaJava.map(item => this.adapter(item)))
    )
    .subscribe({
      next: (listaPronta) => {
        this.courtSubject.next(listaPronta);
      },
      error: (err) => {
        console.error('Erro ao carregar quadras:', err);
      }
    })
  }

  getCourts(): Observable<ICourt[]> {
    return this.court$;
  }

  removeCourt(idCourt: number): void {
    this.http.delete(`${this.API_URL}/${idCourt}`).subscribe({
      next: () => {
        this.loadCourts();
      },
      error: (err) => {
        console.error('Erro ao remover quadra:', err);
      }
    });
  }

  addCourt(quadra: ICreateCourt): void {
    const payloadJava = {
      nome: quadra.title,
      limiteJogadores: quadra.capacidade,
      imagemUrl: quadra.pathImg,
      horarioAbertura: quadra.horarioAbertura!.toISOString(),
      horarioFechamento: quadra.horarioFechamento!.toISOString(),
    };

    this.http.post(this.API_URL, payloadJava).subscribe({
      next: () => {
        this.loadCourts();
      },
      error: (err) => {
        console.error('Erro ao adicionar quadra:', err);
      }
    });
  }

  updateCourt(updatedCourt: ICourt): void {
   const payloadJava = {
      nome: updatedCourt.title,
      limiteJogadores: updatedCourt.capacidade,
      imagemUrl: updatedCourt.pathImg,
      horarioAbertura: updatedCourt.horarioAbertura!.toISOString(),
      horarioFechamento: updatedCourt.horarioFechamento!.toISOString(),
    };
    this.http.put(`${this.API_URL}/${updatedCourt.id}`, payloadJava).subscribe({
      next: () => {
        this.loadCourts();
      },
      error: (err) => {
        console.error('Erro ao atualizar quadra:', err);
      }
    });
  }

  private adapter(backendData: CourtResponse): ICourt {
    return {
      id: backendData.id, 
      title: backendData.nome,             
      pathImg: backendData.imagemUrl,      
      capacidade: backendData.limiteJogadores,
      // Tratamento para datas (se vier null, cria data atual ou trata como preferir)
      horarioAbertura: backendData.horarioAbertura ? new Date(backendData.horarioAbertura) : new Date(), 
      horarioFechamento: backendData.horarioFechamento ? new Date(backendData.horarioFechamento) : new Date(),
      diasDisponiveis: []
    };
  }
}
