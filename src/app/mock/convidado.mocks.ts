// Em: src/app/core/mocks/convidado.mocks.ts
import { IConvidado } from '../interfaces/iconvidado';

export const mockConvidadoGuiler: IConvidado = {
  nome: 'Guiler',
  email: 'guiler.dev@senacsp.edu.br',
  telefone: '11999999999',
};

export const mockConvidadoAlice: IConvidado = {
  nome: 'Alice Silva',
  email: 'alice.silva@senacsp.edu.br',
  telefone: '11988888888',
};

export const mockConvidadoBruno: IConvidado = {
  nome: 'Bruno Costa',
  email: 'bruno.costa@senacsp.edu.br',
  telefone: '11977777777',
};

export const mockListaDeConvidados: IConvidado[] = [
  mockConvidadoGuiler,
  mockConvidadoAlice,
  mockConvidadoBruno,
];