import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typing',
  pure: false // precisa ser false para atualizar a view
})
export class TypingPipe implements PipeTransform {
  private displayedText = '';
  private index = 0;
  private intervalStarted = false;

  transform(value: string): string {
    if (!this.intervalStarted && value) {
      this.intervalStarted = true;
      const chars = value.split('');
      const interval = setInterval(() => {
        if (this.index < chars.length) {
          this.displayedText += chars[this.index];
          this.index++;
        } else {
          clearInterval(interval); // para quando terminar
        }
      }, 80); // velocidade da digitação (ms por caractere)
    }
    return this.displayedText;
  }
}
