import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterReservaAdmDialog } from './alter-reserva-adm-dialog';

describe('AlterReservaAdmDialog', () => {
  let component: AlterReservaAdmDialog;
  let fixture: ComponentFixture<AlterReservaAdmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterReservaAdmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterReservaAdmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
