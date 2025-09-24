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
      },
      {
        pathImg: 'images/b.png',
        title: 'Society',
      },
      {
        pathImg: 'images/c.png',
        title: 'Poliesportiva externa',
      },
    ];
  }
}
