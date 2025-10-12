import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarReservaAdmDialog } from './cancelar-reserva-adm-dialog';

describe('CancelarReservaAdmDialog', () => {
  let component: CancelarReservaAdmDialog;
  let fixture: ComponentFixture<CancelarReservaAdmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarReservaAdmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarReservaAdmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
