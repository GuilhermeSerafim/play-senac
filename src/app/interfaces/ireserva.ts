import { IConvidado } from './iconvidado';
import { ICourt } from './icourt';
import { IUsuario } from './iusuario';

export interface IReserva {
  id: number;
  quadra: ICourt;
  usuario: IUsuario;
  dataInicio: Date;
  dataFim: Date;
  convidados: IConvidado[];
}

export interface ICreateReserva {
  quadraId: number;
  usuarioId: number;
  dataInicio: Date;
  dataFim: Date;
  convidados: IConvidado[];
}