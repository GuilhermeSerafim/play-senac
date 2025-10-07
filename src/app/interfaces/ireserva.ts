import { IConvidado } from './iconvidado';

export interface IReserva {
  quadra: string;
  data: Date;
  horario: string;
  convidados: IConvidado[];
}
