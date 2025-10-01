import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cadastro } from './cadastro';

describe('Cadastro', () => {
  let component: Cadastro;
  let fixture: ComponentFixture<Cadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
