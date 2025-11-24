export interface ICourt {
  id: number;
  pathImg: string;
  title: string;
  capacidade?: number;
  horarioAbertura?: Date;
  horarioFechamento?: Date;
  diasDisponiveis?: number[];
  bloqueada?: boolean;
}

export type ICreateCourt = Omit<ICourt, 'id'>;