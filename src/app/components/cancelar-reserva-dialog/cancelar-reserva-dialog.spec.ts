import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarReservaDialog } from './cancelar-reserva-dialog';

describe('CancelarReservaDialog', () => {
  let component: CancelarReservaDialog;
  let fixture: ComponentFixture<CancelarReservaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarReservaDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarReservaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
