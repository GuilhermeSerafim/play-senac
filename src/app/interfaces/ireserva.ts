import { IConvidado } from './iconvidado';

export interface IReserva {
  id: number; // Ou string
  quadra: string;
  data: Date;
  horario: string;
  convidados: IConvidado[];
}

// Este novo tipo é exatamente IReserva, mas sem o campo 'id'.
export type ICreateReserva = Omit<IReserva, 'id'>;