import { IConvidado } from "./iconvidado";
import { ICourt } from "./icourt";

export interface IReservaDisplay {
  id: number;
  pathImg: string;
  quadra: ICourt;
  horario: Date;
  capacidade?: number;
  data: Date;
  convidados: IConvidado[];
}