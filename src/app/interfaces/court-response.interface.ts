export interface CourtResponse {
  id: number;
  nome: string;
  imagemUrl: string;
  limiteJogadores: number;
  horarioAbertura: string | null;
  horarioFechamento: string | null;
  diasSemana: number[];
  bloqueada: boolean;
}