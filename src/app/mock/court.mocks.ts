// import { ICourt } from '../interfaces/icourt';
// import { DiaDaSemana } from '../enum/DiaDaSemana'; // 1. Importando o Enum
// import { createTime } from '../helpers/date.helpers';

// // --- Mocks de Quadras ---

// export const mockQuadraTenis: ICourt = {
//   id: 1,
//   pathImg: 'images/tenis.jpg',
//   title: 'Tênis',
//   limiteJogadores: 4,
//   horarioAbertura: createTime(8), // 3. Usando o helper de horário
//   horarioFechamento: createTime(22),
//   diasDisponiveis: [
//     // 2. Usando o Enum para clareza
//     DiaDaSemana.Domingo,
//     DiaDaSemana.Sabado,
//   ],
// };

// export const mockQuadraSociety: ICourt = {
//   id: 2,
//   pathImg: 'images/society.jpg',
//   title: 'Society',
//   limiteJogadores: 16,
//   horarioAbertura: createTime(8),
//   horarioFechamento: createTime(22),
//   diasDisponiveis: [
//     DiaDaSemana.Segunda,
//     DiaDaSemana.Terca,
//     DiaDaSemana.Quarta,
//     DiaDaSemana.Quinta,
//     DiaDaSemana.Sexta,
//   ],
// };

// export const mockQuadraPoliExterna: ICourt = {
//   id: 3,
//   pathImg: 'images/poliesportiva-externa.jpg',
//   title: 'Poliesportiva externa',
//   limiteJogadores: 10,
//   horarioAbertura: createTime(8),
//   horarioFechamento: createTime(22),
//   diasDisponiveis: [DiaDaSemana.Terca, DiaDaSemana.Quarta],
// };

// // Lista consolidada para facilitar a importação em outros lugares
// export const mockListaDeQuadras: ICourt[] = [
//   mockQuadraTenis,
//   mockQuadraSociety,
//   mockQuadraPoliExterna,
// ];
