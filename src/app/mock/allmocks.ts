import { IConvidado } from '../interfaces/iconvidado';
import { IReserva } from '../interfaces/ireserva';

const mockConvidados: IConvidado[] = [
  { nome: 'Guiler', email: 'guiler.dev@senacsp.edu.br', telefone: '11999999999' },
  { nome: 'Alice Silva', email: 'alice.silva@senacsp.edu.br', telefone: '11988888888' },
  { nome: 'Bruno Costa', email: 'bruno.costa@senacsp.edu.br', telefone: '11977777777' },
];

export const mockReservaCompleta: IReserva = {
  id: 100,
  quadra: 'Tênis',
  data: new Date(2025, 9, 1), // Mês 9 = Outubro, pois é base 0
  horario: '10:00',
  convidados: mockConvidados,
};

export const mockReservaSemConvidados: IReserva = {
  id: 101,
  quadra: 'Society',
  data: new Date(2025, 8, 30),
  horario: '10:00',
  convidados: [],
};

export const mockListaDeReservas: IReserva[] = [
  mockReservaCompleta,
  mockReservaSemConvidados,
  {
    id: 102,
    quadra: 'Poliesportiva externa',
    data: new Date(2025, 8, 29),
    horario: '10:30',
    convidados: [mockConvidados[0]], // Apenas um convidado
  },
];
