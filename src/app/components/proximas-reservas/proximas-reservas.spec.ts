import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximasReservas } from './proximas-reservas';

describe('ProximasReservas', () => {
  let component: ProximasReservas;
  let fixture: ComponentFixture<ProximasReservas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProximasReservas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximasReservas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
