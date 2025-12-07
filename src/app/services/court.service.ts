import { Injectable } from '@angular/core';
import { ICourt, ICreateCourt } from '../interfaces/icourt';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CourtResponse } from '../interfaces/court-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  private readonly API_URL = `${environment.apiUrl}/quadras`;

  // ReplaySubject(1) guarda o último valor emitido, mas NÃO começa com valor.
  // Assim, o componente fica esperando (loading) até a API responder a primeira vez.
  private courtSubject = new ReplaySubject<ICourt[]>(1);
  public court$: Observable<ICourt[]> = this.courtSubject.asObservable();

  constructor(private readonly http: HttpClient) {
    this.loadCourts();
  }

  loadCourts() {
    this.http
      .get<CourtResponse[]>(this.API_URL)
      .pipe(map((listaJava) => listaJava.map((item) => this.adapter(item))))
      .subscribe({
        next: (listaPronta) => {
          this.courtSubject.next(listaPronta);
        },
        error: (err) => {
          console.error('Erro ao carregar quadras:', err);
          // Opcional: Emite um erro ou array vazio para destravar o spinner em caso de falha
          this.courtSubject.error(err);
        },
      });
  }

  getCourts(): Observable<ICourt[]> {
    return this.court$;
  }

  removeCourt(idCourt: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${idCourt}`).pipe(tap(() => this.loadCourts()));
  }

  addCourt(quadra: ICreateCourt): Observable<any> {
    const payloadJava = {
      nome: quadra.title,
      limiteJogadores: quadra.capacidade,
      imagemUrl: quadra.pathImg,

      horarioAbertura: this.formatTimeForJava(quadra.horarioAbertura),
      horarioFechamento: this.formatTimeForJava(quadra.horarioFechamento),
      diasSemana: quadra.diasDisponiveis,
      bloqueada: quadra.bloqueada,
    };

    return this.http.post(this.API_URL, payloadJava).pipe(tap(() => this.loadCourts()));
  }

  updateCourt(updatedCourt: ICourt): Observable<any> {
    const payloadJava = {
      nome: updatedCourt.title,
      limiteJogadores: updatedCourt.capacidade,
      imagemUrl: updatedCourt.pathImg,

      horarioAbertura: this.formatTimeForJava(updatedCourt.horarioAbertura),
      horarioFechamento: this.formatTimeForJava(updatedCourt.horarioFechamento),
      diasSemana: updatedCourt.diasDisponiveis,
      bloqueada: updatedCourt.bloqueada,
    };
    return this.http
      .put(`${this.API_URL}/${updatedCourt.id}`, payloadJava)
      .pipe(tap(() => this.loadCourts()));
  }

  private adapter(backendData: CourtResponse): ICourt {
    return {
      id: backendData.id,
      title: backendData.nome,
      pathImg: this.fixGoogleDriveUrl(backendData.imagemUrl),
      capacidade: backendData.limiteJogadores,
      horarioAbertura: this.timeToDate(backendData.horarioAbertura)!,
      horarioFechamento: this.timeToDate(backendData.horarioFechamento)!,
      diasDisponiveis: backendData.diasSemana || [],
      bloqueada: backendData.bloqueada,
    };
  }

  /**
   * Helper para converter string "HH:mm:ss" do Java para Date do JS
   */
  private timeToDate(timeStr: string | null): Date | null {
    if (!timeStr) return null;

    // 2. Quebramos a string "08:00:00" nos dois pontos
    const parts = timeStr.split(':'); // ["08", "00", "00"]

    const date = new Date();

    // 3. Setamos a hora e minuto na data de hoje
    date.setHours(Number(parts[0]));
    date.setMinutes(Number(parts[1]));
    date.setSeconds(0);

    return date;
  }

  /**
   * Transforma link do Drive em link "CDN" que o Google permite exibir em sites
   */
  private fixGoogleDriveUrl(url: string): string {
    if (!url) return 'assets/img/placeholder.png';

    // Se não for link do Google Drive, retorna ele mesmo
    if (!url.includes('drive.google.com')) return url;

    // Extrai o ID do arquivo
    // Aceita formatos: /d/ID/view, id=ID, etc.
    const idMatch = url.match(/[-\w]{25,}/);

    if (idMatch) {
      // TRUQUE: Usar lh3.googleusercontent.com/d/ID
      // Esse domínio não bloqueia exibição em sites externos
      return `https://lh3.googleusercontent.com/d/${idMatch[0]}`;
    }

    return url;
  }

  /**
   * Converte um objeto Date do JS para string "HH:mm:00" que o Java LocalTime aceita.
   */
  private formatTimeForJava(date: Date | null | undefined): string | null {
    if (!date) return null;

    // Garante que é um objeto Date válido
    const d = new Date(date);

    // Pega as horas e minutos e adiciona o zero à esquerda se for menor que 10 (ex: 9 vira 09)
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    // Retorna o formato limpo: "11:00:00"
    return `${hours}:${minutes}:00`;
  }
}
