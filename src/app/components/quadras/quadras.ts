import { Component } from '@angular/core';
import { ICourt } from '../../interfaces/icourt-card';

@Component({
  selector: 'app-quadras',
  imports: [],
  templateUrl: './quadras.html',
  styleUrl: './quadras.scss'
})
export class Quadras {
  courts: ICourt[] = [];
  
}
