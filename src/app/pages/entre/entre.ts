import { Component, ElementRef } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entre',
  imports: [
    CommonModule,
    FormsModule,
    Header,
    Footer,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './entre.html',
  styleUrl: './entre.scss',
})
export class Entre {
  constructor(private readonly _el: ElementRef, private readonly _router: Router) {}
  // Adicione a propriedade para controlar a visibilidade da senha
  hidePassword = true;

  aoClicarEmCriarUmaConta() {
    this._router.navigate(['/cadastro']);
  }

  aoEsquecerASenha() {
    // Sua lógica aqui
    console.log('Clicou em Esqueceu a Senha');
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulário válido:', form.value);
    } else {
      console.log('Formulário inválido.');
    }
    if (form.invalid) {
      this.focusOnInvalidControl(form);
      return;
    }
  }

  focusOnInvalidControl(form: NgForm) {
    for (const control in form.controls) {
      const invalidControl: HTMLElement = this._el.nativeElement.querySelector(`[name=${control}]`);
      invalidControl.focus();
      break;
    }
  }
}
