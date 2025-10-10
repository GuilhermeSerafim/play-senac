export interface ICourt {
  pathImg: string;
  title: string;
  capacidade?: number;
  diasDisponiveis?: string[];
  horarioAbertura?: Date;
  horarioFechamento?: Date;
}
