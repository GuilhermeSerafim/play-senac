import { IConvidado } from "./iconvidado";

export interface ReservaResponse {
  id: number;
  dataHoraInicio: string;
  dataHoraFim: string;
  idUsuario: number;
  idQuadra: number;
  convidados: IConvidado[]; 
}