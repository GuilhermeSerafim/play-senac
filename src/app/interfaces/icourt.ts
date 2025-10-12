export interface ICourt {
  id: number;
  pathImg: string;
  title: string;
  capacidade?: number;
  diasDisponiveis?: string[];
  horarioAbertura?: Date;
  horarioFechamento?: Date;
}

export type ICreateCourt = Omit<ICourt, 'id'>;