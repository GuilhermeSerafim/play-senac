// Interface para listagem e visualização (GET)
export interface IBloqueio {
  id: number;
  dataHoraInicio: Date; // O Service vai converter de string para Date
  dataHoraFim: Date;
  motivo: string;
  
  // Dependendo de como seu back retorna, pode ser o objeto ou só o ID
  // Vou assumir que retorna o objeto simplificado ou ID, ajuste conforme seu DTO
  quadraId: number; 
  usuarioId: number;
}

// Interface para criação (POST) e edição (PUT)
export interface ICreateBloqueio {
  dataHoraInicio: string; // Enviamos como string ISO ou formatada
  dataHoraFim: string;
  motivo: string;
  idQuadra: number;
  idUsuario: number;
}