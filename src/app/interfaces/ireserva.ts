import { IConvidado } from './iconvidado';
import { ICourt } from './icourt';

export interface IReserva {
  id: number; // Ou string
  quadra: ICourt;
  data: Date;
  horario: Date;
  convidados: IConvidado[];
}

// Este novo tipo é exatamente IReserva, mas sem o campo 'id'.
export type ICreateReserva = Omit<IReserva, 'id'>;
