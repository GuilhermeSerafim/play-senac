import { Injectable } from '@angular/core';
import { ICourtCard } from '../interfaces/icourt-card';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  getCourts(): ICourtCard[] {
    return [
      {
        pathImg: 'images/a.png',
        title: 'Tênis',
        capacidade: 4,
      },
      {
        pathImg: 'images/b.png',
        title: 'Society',
        capacidade: 16,
      },
      {
        pathImg: 'images/c.png',
        title: 'Poliesportiva externa',
        capacidade: 10,
      },
    ];
  }
}
