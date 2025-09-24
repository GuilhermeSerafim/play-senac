import { Component } from '@angular/core';
import { TypingPipe } from '../../pipes/typing-pipe';

@Component({
  selector: 'app-hero',
  imports: [TypingPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

}
