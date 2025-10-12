import { IConvidado } from "./iconvidado";

export interface IReservaDisplay {
  id: number;
  pathImg: string;
  title: string;
  horario: string;
  capacidade?: number;
  data: Date;
  convidados: IConvidado[];
}