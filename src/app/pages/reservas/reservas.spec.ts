import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservas } from './reservas';

describe('Reservas', () => {
  let component: Reservas;
  let fixture: ComponentFixture<Reservas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reservas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reservas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
