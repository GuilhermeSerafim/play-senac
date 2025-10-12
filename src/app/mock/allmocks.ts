import { IConvidado } from '../interfaces/iconvidado';
import { ICourt } from '../interfaces/icourt';
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

export const mockListaDeQuadras: ICourt[] = [
  {
    id: 1,
    pathImg: 'images/a.png',
    title: 'Tênis',
    capacidade: 4,
    horarioAbertura: new Date(2025, 9, 10, 8, 0),
    horarioFechamento: new Date(2025, 9, 10, 22, 0),
    diasDisponiveis: [
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
      'Domingo',
    ],
  },
  {
    id: 2,
    pathImg: 'images/b.png',
    title: 'Society',
    capacidade: 16,
    horarioAbertura: new Date(2025, 9, 10, 8, 0),
    horarioFechamento: new Date(2025, 9, 10, 22, 0),
    diasDisponiveis: [
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
      'Domingo',
    ],
  },
  {
    id: 3,
    pathImg: 'images/c.png',
    title: 'Poliesportiva externa',
    capacidade: 10,
    horarioAbertura: new Date(2025, 9, 10, 8, 0),
    horarioFechamento: new Date(2025, 9, 10, 22, 0),
    diasDisponiveis: [
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
      'Domingo',
    ],
  },
];
