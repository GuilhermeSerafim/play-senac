// Em: src/app/core/mocks/reserva.mocks.ts
import { IReserva } from '../interfaces/ireserva';

// 1. Importa os mocks de outros domínios
import {
  mockConvidadoGuiler,
  mockListaDeConvidados,
} from './convidado.mocks';
import {
  mockQuadraPoliExterna,
  mockQuadraSociety,
  mockQuadraTenis,
} from './court.mocks';

// --- Mocks de Reservas ---

export const mockReservaCompleta: IReserva = {
  id: 100,
  quadra: mockQuadraTenis, // 2. Usa o objeto da quadra, não mais uma string
  data: new Date('2025-10-01T00:00:00'), // 3. Formato ISO 8601 é mais claro
  horario: new Date('2025-10-15T12:00:00'),
  convidados: mockListaDeConvidados, // Usa a lista de convidados importada
};

export const mockReservaSemConvidados: IReserva = {
  id: 101,
  quadra: mockQuadraSociety,
  data: new Date('2025-09-30T00:00:00'),
  horario: new Date('2025-10-15T18:00:00'),
  convidados: [],
};

export const mockReservaPoli: IReserva = {
  id: 102,
  quadra: mockQuadraPoliExterna,
  data: new Date('2025-09-29T00:00:00'),
  horario: new Date('2025-10-15T20:00:00'),
  convidados: [mockConvidadoGuiler], // Reutiliza um convidado específico
};

// Lista consolidada para facilitar a importação
export const mockListaDeReservas: IReserva[] = [
  mockReservaCompleta,
  mockReservaSemConvidados,
  mockReservaPoli,
];