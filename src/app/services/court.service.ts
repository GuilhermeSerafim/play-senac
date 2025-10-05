import { Injectable } from '@angular/core';
import { ICourtCard } from '../types/icourt-card';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  getCourts(): ICourtCard[] {
    return [
      {
        pathImg: 'images/a.png',
        title: 'Tênis',
        horario: '10h00 - 11h30',
        capacidade: 16,
        data: new Date(2025, 9, 1), // Mês 9 = Outubro, pois é base 0
      },
      {
        pathImg: 'images/b.png',
        title: 'Society',
        horario: '10h00 - 11h30',
        capacidade: 16,
        data: new Date(2025, 8, 30), // Mês 8 = Setembro
      },
      {
        pathImg: 'images/c.png',
        title: 'Poliesportiva externa',
        horario: '10h30 - 11h30',
        capacidade: 10,
        data: new Date(), // Agora
      },
    ];
  }
}
