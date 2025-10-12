import { IConvidado } from "./iconvidado";

export interface IReservaDisplay {
  id: number;
  pathImg: string;
  title: string;
  horario: Date;
  capacidade?: number;
  data: Date;
  convidados: IConvidado[];
}